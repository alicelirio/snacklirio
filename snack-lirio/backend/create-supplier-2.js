const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createSupplier() {
  try {
    const hashedPassword = await bcrypt.hash('fornecedor456', 10);
    
    const user = await prisma.user.create({
      data: {
        name: 'João Fornecedor',
        email: 'joao@fornecedor.com',
        password: hashedPassword,
        type: 'fornecedor'
      }
    });

    console.log('✅ Segundo fornecedor criado com sucesso!');
    console.log('📧 Email:', user.email);
    console.log('🔑 Senha: fornecedor456');
    console.log('👤 Tipo:', user.type);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createSupplier();
