const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function test() {
  try {
    console.log('🔍 Testando conexão com MySQL...\n');
    
    // Contar usuários
    const userCount = await prisma.user.count();
    console.log(`👥 Usuários no banco: ${userCount}`);
    
    // Listar usuários
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, type: true }
    });
    console.log('\n📋 Lista de usuários:');
    users.forEach(u => console.log(`  - ${u.name} (${u.email}) - Tipo: ${u.type}`));
    
    // Contar produtos
    const productCount = await prisma.product.count();
    console.log(`\n📦 Produtos no banco: ${productCount}`);
    
    // Listar produtos
    const products = await prisma.product.findMany({
      select: { id: true, name: true, price: true, supplierId: true }
    });
    console.log('\n📋 Lista de produtos:');
    if (products.length === 0) {
      console.log('  ⚠️ Nenhum produto cadastrado!');
    } else {
      products.forEach(p => console.log(`  - ${p.name} - R$ ${p.price}`));
    }
    
    console.log('\n✅ Teste concluído!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
