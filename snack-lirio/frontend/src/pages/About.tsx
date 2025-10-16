export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Sobre o Snack Lírio</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                O Snack Lírio é um projeto desenvolvido para facilitar os pedidos de comida dentro do internato,
                conectando alunos, mercearias e restaurantes locais de forma prática e eficiente.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Nossa Missão</h2>
              <p className="text-gray-700 mb-4">
                Proporcionar uma experiência conveniente e agradável para os alunos do internato,
                permitindo que façam seus pedidos de forma rápida e segura.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Como Funciona</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600">
                      1
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      Faça seu cadastro na plataforma
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600">
                      2
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      Escolha os produtos que deseja
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600">
                      3
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      Adicione ao carrinho e finalize seu pedido
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Projeto TCC</h2>
              <p className="text-gray-700 mb-4">
                Este projeto foi desenvolvido como parte do Trabalho de Conclusão de Curso
                do curso Técnico em Informática, utilizando tecnologias modernas como
                React, Node.js e Prisma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
