const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createSupplier() {
  try {
    const hashedPassword = await bcrypt.hash('fornecedor123', 10);

    const supplier = await prisma.user.create({
      data: {
        name: 'Fornecedor Teste',
        email: 'fornecedor@test.com',
        password: hashedPassword,
        type: 'fornecedor',
      },
    });

    console.log('✅ Fornecedor criado com sucesso!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: fornecedor@test.com');
    console.log('🔑 Senha: fornecedor123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️  Fornecedor já existe!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email: fornecedor@test.com');
      console.log('🔑 Senha: fornecedor123');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else {
      console.error('❌ Erro:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createSupplier();
