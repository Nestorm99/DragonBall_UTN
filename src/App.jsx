import { useState, useEffect, useMemo } from 'react';
import { Contendor } from './components/Contenedor.jsx';
import { consultar } from './api/api.js';
import { Tarjeta } from './components/Tarjeta.jsx';

function App() {
  const [items, setItems] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function cargar() {
      setLoading(true);
      const personajes = await consultar();
      setItems(personajes);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    cargar();
  }, []);

  const personajesFiltrados = useMemo(() => {
    if (busqueda.trim() === '') {
      return items;
    }

    // Limpia la búsqueda para que solo contenga números
    const busquedaLimpia = busqueda.replace(/\D/g, '');

    return items.filter(personaje => {
      const nombrePersonaje = personaje.name.toLowerCase();
      // Limpia el ki del personaje eliminando puntos, comas y otros caracteres no numéricos
      const kiLimpio = personaje.ki.toString().replace(/[\.,]/g, '');

      return nombrePersonaje.includes(busqueda.toLowerCase()) || kiLimpio.includes(busquedaLimpia);
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