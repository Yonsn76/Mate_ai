import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ¡Hola desde Mate AI!
        </h1>
        
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            Este es un proyecto React con Vite y Tailwind CSS
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 font-medium">
              Contador: <span className="text-2xl font-bold">{count}</span>
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-200 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Incrementar
          </button>
          <button
            onClick={() => setCount((count) => count - 1)}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded transition duration-200 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Decrementar
          </button>
          <button
            onClick={() => setCount(0)}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition duration-200 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Resetear
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Proyecto creado con React + Vite + Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
