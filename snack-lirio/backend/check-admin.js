const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    console.log('🔍 Verificando usuário admin...\n');
    
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@snacklirio.com' }
    });
    
    if (!admin) {
      console.log('❌ Admin não encontrado! Criando...\n');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const newAdmin = await prisma.user.create({
        data: {
          name: 'Administrador',
          email: 'admin@snacklirio.com',
          password: hashedPassword,
          type: 'admin'
        }
      });
      
      console.log('✅ Admin criado com sucesso!');
      console.log(`📧 Email: ${newAdmin.email}`);
      console.log(`🔑 Senha: admin123`);
      console.log(`👤 Tipo: ${newAdmin.type}`);
    } else {
      console.log('✅ Admin encontrado!');
      console.log(`📧 Email: ${admin.email}`);
      console.log(`👤 Nome: ${admin.name}`);
      console.log(`🔑 Tipo: ${admin.type}`);
      console.log('\n🔄 Resetando senha para: admin123\n');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await prisma.user.update({
        where: { id: admin.id },
        data: { password: hashedPassword }
      });
      
      console.log('✅ Senha resetada com sucesso!');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
