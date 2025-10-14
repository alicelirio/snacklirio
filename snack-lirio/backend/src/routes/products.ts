import { Router, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth';
import { upload } from '../utils/upload';

const router = Router();
const prisma = new PrismaClient();

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        supplier: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Listar produtos de um fornecedor específico
router.get('/supplier', authMiddleware, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        supplierId: req.userId,
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Criar novo produto
// multipart/form-data with optional image file (field: image)
router.post('/', authMiddleware, upload.single('image'), async (req: Request & { file?: any }, res) => {
  try {
  const { name, description, price } = req.body;
  const file = req.file;

    const product = await prisma.product.create({
      data: {
        name,
        description,
    price: parseFloat(price),
    image: file ? `/uploads/${file.filename}` : undefined,
        supplierId: req.userId!,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Atualizar produto
router.put('/:id', authMiddleware, upload.single('image'), async (req: Request & { file?: any }, res) => {
  try {
    const { id } = req.params;
  const { name, description, price } = req.body;
  const file = req.file;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (product.supplierId !== req.userId) {
      return res.status(403).json({ error: 'Sem permissão para editar este produto' });
    }

  const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
    price: parseFloat(price),
    image: file ? `/uploads/${file.filename}` : undefined,
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// Excluir produto
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (product.supplierId !== req.userId) {
      return res.status(403).json({ error: 'Sem permissão para excluir este produto' });
    }

    await prisma.product.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});

export default router;
