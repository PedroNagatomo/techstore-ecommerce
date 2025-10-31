import React from 'react'
import './index.css'

function AppTest() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Cabeçalho de Teste */}
      <div className="bg-blue-600 text-white p-4 rounded-lg mb-8">
        <h1 className="text-3xl font-bold">🚀 TESTE TAILWIND</h1>
        <p className="text-blue-100">Se isso estiver azul e organizado, o Tailwind está funcionando!</p>
      </div>

      {/* Grid de Teste */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-green-600 mb-2">✅ Card 1</h2>
          <p className="text-gray-600">Este card deve ter sombra e bordas arredondadas</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">✅ Card 2</h2>
          <p className="text-gray-600">Grid responsivo deve funcionar</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-purple-600 mb-2">✅ Card 3</h2>
          <p className="text-gray-600">Em mobile: uma coluna, em desktop: três colunas</p>
        </div>
      </div>

      {/* Botões de Teste */}
      <div className="flex gap-4 flex-wrap">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Botão Primário
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Botão Secundário
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Botão Sucesso
        </button>
      </div>
    </div>
  )
}

export default AppTest