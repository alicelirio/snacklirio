const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('\n👥 Usuários cadastrados no banco:\n');
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   Tipo: ${user.role}`);
      console.log(`   Cadastrado em: ${new Date(user.createdAt).toLocaleString('pt-BR')}`);
      console.log('');
    });

    console.log(`📊 Total de usuários: ${users.length}`);

  } catch (error) {
    console.error('❌ Erro ao buscar usuários:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
