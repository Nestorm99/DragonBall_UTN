import { useState, useEffect } from 'react'
import { Contendor } from "./components/Contenedor"
import { consultar } from "./api/api.js"
import { Tarjeta } from './components/Tarjeta.jsx'

function App() {
  const [items, setItems] = useState([])
  const [resultados, setResultados] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function cargar() {
      setLoading(true)
      const personajes = await consultar()
      setItems(personajes)
      setResultados(personajes)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    cargar()
  }, [])

  const Buscar = () => {
    if (busqueda.trim() === "") {
      setResultados(items)
      return
    }

    const personajesFiltrados = items.filter((personaje) => {
      const busquedaMinuscula = busqueda.toLowerCase()
      const nombrePersonaje = personaje.name.toLowerCase()
      const kiPersonaje = personaje.ki.toString()

      return nombrePersonaje.includes(busquedaMinuscula) || kiPersonaje.includes(busquedaMinuscula)
    })

    setResultados(personajesFiltrados)
  }

  if (loading) {
    return <p className="text-3xl font-bold">Cargando....</p>
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-8 p-4 bg-gradient-to-b from-amber-400 via-amber-300 to-emerald-400">
      
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Buscar por nombre o ki..."
          className="p-2 rounded-lg border-2 border-blue-800"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button
          onClick={Buscar}
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors"
        >
          Buscar
        </button>
      </div>

      <Contendor>
        {
          resultados.length > 0 ? (
            resultados.map((item) => {
              return <Tarjeta item={item} key={item?.id} />
            })
          ) : (
            <p className="text-2xl font-bold text-black">No se encontraron personajes.</p>
          )
        }
      </Contendor>
    </div>
  )
}

export default App
