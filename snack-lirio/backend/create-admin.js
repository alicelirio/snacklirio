const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Criar usuário admin
    const admin = await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'admin@snacklirio.com',
        password: hashedPassword,
        type: 'admin',
      },
    });

    console.log('✅ Admin criado com sucesso!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: admin@snacklirio.com');
    console.log('🔑 Senha: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANTE: Troque essa senha após o primeiro login!');
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️  Usuário admin já existe!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email: admin@snacklirio.com');
      console.log('🔑 Senha: admin123');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else {
      console.error('❌ Erro ao criar admin:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
