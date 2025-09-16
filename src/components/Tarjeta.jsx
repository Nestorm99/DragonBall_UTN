export function Tarjeta({ item }) {

  return (
    <div
      className=" flex flex-col justify-between items-center  w-[200px] h-[340px]
       border-2 rounded-2xl border-black bg-gradient-to-b from-blue-200 via-blue-400 to-sky-100">

      <h3 className="flex text-xl font-extrabold 
      font-mono w-[195px] justify-center
       text-black bg-gradient-to-b from-blue-600 via-blue-300 to-sky-100  rounded-2xl
       ">{item?.name}</h3>

      <img
        className="w-[200px] h-[250px] object-contain "
        src={item?.image} />

      <p className="flex justify-center w-[195px] font-semibold text-black 
      bg-gradient-to-t from-amber-200 via-amber-400 to-red-500 rounded-2xl ">Ki: {item?.ki}</p>
    </div>
  )
}
