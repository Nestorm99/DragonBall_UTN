export function Tarjeta({ item }) {

  return (
    <div
      className=" flex flex-col items-center w-[200px] h-[500px] border-2 rounded-3xl border-white gap-7 p-5 ">
      <h3 className="text-2xl font-extrabold text-black bg-gradient-to-t from-blue-900 via-sky-400 to-white px-4 py-2 rounded-2xl">{item?.name}</h3>

      <img
        className="w-[200px] h-[280px] object-contain "
        src={item?.image} />

      <p className="flex text-2xl font-semibold text-black bg-gradient-to-b from-amber-200 via-amber-500 to-red-600  px-7 rounded-4xl">Ki: {item?.ki}</p>
    </div>
  )
}
