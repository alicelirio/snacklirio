const axios = require('axios');

async function testLogin() {
  try {
    console.log('🧪 Testando login do admin...\n');
    
    const response = await axios.post('http://localhost:3000/auth/login', {
      email: 'admin@snacklirio.com',
      password: 'admin123'
    });
    
    console.log('✅ Login bem-sucedido!');
    console.log('📋 Resposta:');
    console.log('  - Token:', response.data.token.substring(0, 20) + '...');
    console.log('  - Usuário:', response.data.user.name);
    console.log('  - Email:', response.data.user.email);
    console.log('  - Tipo:', response.data.user.type);
    
  } catch (error) {
    console.error('❌ Erro ao fazer login:');
    if (error.response) {
      console.error('  - Status:', error.response.status);
      console.error('  - Mensagem:', error.response.data.error || error.response.data);
    } else {
      console.error('  - Erro:', error.message);
    }
  }
}

testLogin();
