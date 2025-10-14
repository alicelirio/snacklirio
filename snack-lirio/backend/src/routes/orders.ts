import { Router } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const prisma = new PrismaClient();

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
}

// POST /orders - Criar um novo pedido
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const userId = req.userId;

    // Calcula o total do pedido
    const total = items.reduce((acc: number, item: OrderItem) => {
      return acc + (item.price * item.quantity);
    }, 0);

    // Cria o pedido com seus itens
    const order = await prisma.order.create({
      data: {
        userId,
        status: 'pending',
        total: total,
        items: {
          create: items.map((item: OrderItem) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });

    res.json(order);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

// GET /orders - Listar todos os pedidos (admin/fornecedor)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Usuário não autenticado' });
    if (req.userType !== 'admin' && req.userType !== 'fornecedor') {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    const where = req.userType === 'fornecedor'
      ? {
          items: {
            some: {
              product: {
                supplierId: req.userId,
              },
            },
          },
        }
      : {};

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, image: true, supplierId: true },
            },
          },
        },
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
});

// GET /orders/:orderId/details - Obter detalhes de um pedido específico
router.get('/:orderId/details', authMiddleware, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: req.params.orderId
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Verifica se o pedido pertence ao usuário
    if (order.userId !== req.userId) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    res.json(order);
  } catch (error) {
    console.error('Erro ao buscar detalhes do pedido:', error);
    res.status(500).json({ error: 'Erro ao buscar detalhes do pedido' });
  }
});

// GET /orders/:userId - Listar pedidos do usuário
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Verifica se o usuário está tentando acessar seus próprios pedidos
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: req.params.userId
      },
      select: {
        id: true,
        status: true,
        total: true,
        createdAt: true,
        items: {
          select: {
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
});

// PATCH /orders/:orderId/status - Atualizar status do pedido (admin/fornecedor)
router.patch('/:orderId/status', authMiddleware, async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Usuário não autenticado' });
    if (req.userType !== 'admin' && req.userType !== 'fornecedor') {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    const { orderId } = req.params;
    const { status } = req.body as { status?: string };
    const allowed = ['pending', 'processing', 'shipped', 'delivered'];
    if (!status || !allowed.includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    // Se fornecedor, garantir que o pedido possui item de sua responsabilidade
    if (req.userType === 'fornecedor') {
      const count = await prisma.order.count({
        where: {
          id: orderId,
          items: { some: { product: { supplierId: req.userId } } },
        },
      });
      if (count === 0) return res.status(403).json({ error: 'Sem permissão para atualizar este pedido' });
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    res.json(updated);
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    res.status(500).json({ error: 'Erro ao atualizar status do pedido' });
  }
});

// GET /orders/stats - métricas para dashboard (admin/fornecedor)
router.get('/stats/summary', authMiddleware, async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ error: 'Usuário não autenticado' });
    if (req.userType !== 'admin' && req.userType !== 'fornecedor') {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    const filter = req.userType === 'fornecedor'
      ? { items: { some: { product: { supplierId: req.userId } } } }
      : {};

    const [pending, delivered] = await Promise.all([
      prisma.order.count({ where: { status: 'pending', ...filter } }),
      prisma.order.count({ where: { status: 'delivered', ...filter } }),
    ]);

    res.json({ totalPending: pending, totalDelivered: delivered });
  } catch (error) {
    console.error('Erro ao buscar stats:', error);
    res.status(500).json({ error: 'Erro ao buscar stats' });
  }
});

export default router;
