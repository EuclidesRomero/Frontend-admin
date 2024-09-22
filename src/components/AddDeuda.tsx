import { useEffect, useState } from "react";
import useBussines from "../hooks/useBussines";
import {toast} from 'react-toastify'

interface AddDeudaProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction <boolean>>
  deudaData : string[];
}
const AddDeuda = ({open, setOpen, deudaData}: AddDeudaProps) => {
  const {addDeuda} =useBussines();
  const [id_negocio, id_cliente] = deudaData
  const [monto, setMonto] = useState<string>("")
  const [fecha, setFecha] = useState<Date | undefined >(undefined)


  useEffect(() => {
    setFecha(new Date());
    setMonto("")
  }, [open]);

 
const handledSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (!id_negocio|| !id_cliente || !monto || !fecha) {
    return toast.error('Debes llenar todos los campos', {autoClose: 3000})
  }
  const normalizeNumber = (value:string) => {
    return parseFloat(value.replace(/\./g, ''));
  };
  const normalizedMonto = normalizeNumber(monto);

  if (normalizedMonto < 1000) {
    console.log(monto);
    return toast.error(`¿Cómo vas a guardar ${monto}, hey?🤣`);
  }
  
  
   
 
  try {
    const response = await addDeuda(id_negocio, id_cliente, monto, fecha);
    toast.success(response.message, {autoClose:3000})
    setOpen(!open)
  } catch (error:any) {
    toast.error(error.response.data.message)
  }
}


  return (
    <div className= {`left-0 top-0 z-20 w-2/3 h-[450px] absolute p-8 rounded-lg shadow-lg bg-gray-50 ${ open?'block': 'hidden'}`}>
      <h2 className="mb-2 font-bold text-base">Llena los datos de la deuda</h2>
      <form className="flex flex-col space-y-6" onSubmit={handledSubmit}>
        <div className=" border-2 border-black w-full p-3 rounded-md">
          <input
            type="text"
            placeholder="Monto"
            className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={monto}
            onChange={(e)=> setMonto(e.target.value)}
          />
        </div>
        <div className=" border-2 border-black w-full p-3 rounded-md">
          <input
            type="date"
            placeholder="Fecha del monto"
            className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={fecha ? fecha.toISOString().split("T")[0] : ""}
            onChange={(e)=> setFecha(new Date(e.target.value))}
          />
        </div>
        <button
          type="submit"
          className=" bg-blue-400 text-white w-full p-3 rounded-md hover:bg-blue-500"
        >
          Guardar deuda
        </button>
      </form>
      <div className="h-28 flex flex-col justify-end">
        <div className="flex justify-end">
         <button className="rounded-lg bg-red-500 w-32 h-8 text-white" onClick={()=>setOpen(false)}>cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default AddDeuda;
