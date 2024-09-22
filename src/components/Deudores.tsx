import useBussines from "../hooks/useBussines"
import { DeudoresProps, NegociosProps } from "../context/NegociosProvider"
import { useEffect, useState } from "react";
import Debtor from "./Debtor";
import AddDeuda from "./AddDeuda";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";


const Deudores = () => {
  const { changes, obtenerNegocios, getDeudores, changesDeudor, setChangesDeudor } = useBussines();
  const [negocio, setNegocio] = useState<NegociosProps[]>([]);
  const [negocioSelect, setNegocioSelect] = useState<string>('');
  const [deudor, setDeudores] = useState<DeudoresProps[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [deudaData, setDeudaData] = useState<string[]>(['']);



  useEffect(() => {
    if (negocio && negocio.length > 0 && !negocioSelect) {
      setNegocioSelect(negocio[0].id_negocio);
    }
  }, [negocio, negocioSelect]);

  useEffect(() => {
    const getBussines = async () => {
      try {
        const result = await obtenerNegocios();
        setNegocio(result)
      } catch (error) {
        console.log("error al obtener negocios", error)
      }
    }
    getBussines();
  }, [changes])

  useEffect(() => {
    const obtenerDeudores = async () => {
      try {
        const result = await getDeudores(negocioSelect);
        setDeudores(result.message)
        setChangesDeudor(false)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDeudores();
  }, [negocioSelect, changesDeudor])


  return (
    <div className="w-full h-full">
      <ToastContainer />
      <div className="flex justify-center items-center ">
        <div className=" w-full flex justify-start mb-5 mt-2 ">
          <div><p className="text-2xl font-bold text-violet-500   poppins-light w-56 -ml-10 -mt-1">Deudores</p></div>
          <Link
            to="/dashboard/add-deudor"
            className="relative ml-4 w-32 bg-blue-500 text-white rounded-lg overflow-hidden group"
          >
            <span className="relative z-10">Crear un deudor</span>
            <div className="absolute inset-0 bg-blue-800 transform translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
          </Link>

        </div>
        <div className="h-full w-3/4 flex justify-between relative">
          <div><AddDeuda open={open} setOpen={setOpen} deudaData={deudaData} /></div>
          <div className="w-2/2 mr-5 ">
            <select
              id=""
              value={negocioSelect}
              className="w-full border-2 border-gray-500 rounded-lg text-gray-500 text-center "
              onChange={(e) => {
                setNegocioSelect(e.target.value);
              }}
            >
              {negocio && negocio.length > 0 ? (
                <>
                  <option value="" disabled>
                    Selecciona el negocio
                  </option>
                  {negocio.map((item) => (
                    <option key={item.id_negocio} value={item.id_negocio}>
                      {item.nombre_negocio}
                    </option>
                  ))}
                </>
              ) : (
                <option value="" disabled>
                  No hay negocios
                </option>
              )}
            </select>

          </div>

        </div>
      </div>
      <div className="w-full h-full">
        <Debtor deudor={deudor} setOpen={setOpen} open={open} setDeudaData={setDeudaData} />
      </div>

    </div>
  )
}

export default Deudores
