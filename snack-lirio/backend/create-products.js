const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createProducts() {
  try {
    console.log('📦 Criando produtos de teste...\n');
    
    // Buscar fornecedor
    const supplier = await prisma.user.findFirst({
      where: { type: 'fornecedor' }
    });
    
    if (!supplier) {
      console.log('❌ Nenhum fornecedor encontrado!');
      return;
    }
    
    console.log(`✅ Fornecedor: ${supplier.name}\n`);
    
    const produtos = [
      {
        name: 'Coxinha de Frango',
        description: 'Deliciosa coxinha recheada com frango desfiado',
        price: 5.50,
        supplierId: supplier.id
      },
      {
        name: 'Pastel de Carne',
        description: 'Pastel crocante recheado com carne moída temperada',
        price: 6.00,
        supplierId: supplier.id
      },
      {
        name: 'Suco de Laranja',
        description: 'Suco natural de laranja 500ml',
        price: 8.00,
        supplierId: supplier.id
      },
      {
        name: 'Risole de Queijo',
        description: 'Risole cremoso recheado com queijo mussarela',
        price: 4.50,
        supplierId: supplier.id
      },
      {
        name: 'Refrigerante Lata',
        description: 'Refrigerante gelado 350ml',
        price: 4.00,
        supplierId: supplier.id
      }
    ];
    
    for (const produto of produtos) {
      const created = await prisma.product.create({
        data: produto
      });
      console.log(`✅ ${created.name} - R$ ${created.price.toFixed(2)}`);
    }
    
    console.log('\n🎉 Produtos criados com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createProducts();
