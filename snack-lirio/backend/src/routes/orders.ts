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

export default router;
