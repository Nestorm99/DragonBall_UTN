import { useState, useEffect, useMemo } from 'react';
import { Contendor } from './components/Contenedor';
import { consultar } from './api/api.js';
import { Tarjeta } from './components/Tarjeta.jsx';

function App() {
  const [items, setItems] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function cargar() {
      setLoading(true);
      try {
        const personajes = await consultar();
        setItems(personajes);
      } catch (error) {
        console.error('Error al cargar los personajes:', error);
      } finally {
        // Un retraso para simular la carga, se puede eliminar en producción
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
    cargar();
  }, []);

  // Esta es la lógica clave para el filtro reactivo
  const personajesFiltrados = useMemo(() => {
    // Si la búsqueda está vacía o solo contiene espacios, retorna todos los items.
    if (!busqueda.trim()) {
      return items;
    }

    // Prepara la cadena de búsqueda para la comparación
    const busquedaMinuscula = busqueda.toLowerCase();

    return items.filter(personaje => {
      // Intenta convertir el 'ki' a un número para una comparación más precisa, 
      // si no es un número, se usa su valor original.
      const kiNumero = parseFloat(personaje.ki.toString().replace(/[\.,]/g, ''));

      // Compara el nombre y el 'ki' del personaje con la búsqueda
      const nombreCoincide = personaje.name.toLowerCase().includes(busquedaMinuscula);
      const kiCoincide = !isNaN(kiNumero) && kiNumero.toString().includes(busquedaMinuscula);

      return nombreCoincide || kiCoincide;
    });
  }, [busqueda, items]);

  if (loading) {
    return <p className="text-3xl font-bold">Cargando....</p>;
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
      </div>

      <Contendor>
        {
          personajesFiltrados.length > 0 ? (
            personajesFiltrados.map((item) => {
              return <Tarjeta item={item} key={item?.id} />;
            })
          ) : (
            <p className="text-2xl font-bold text-black">No se encontraron personajes.</p>
          )
        }
      </Contendor>
    </div>
  );
}

export default App;