/* import { IoMdMore } from "react-icons/io";
 */import { CiImport } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import Customer from "./Customer";
import Addcustomers from "./Addcustomers";
import { useEffect, useState } from "react";
import useBussines from "../hooks/useBussines";
import { NegociosProps } from "../context/NegociosProvider";
import { ToastContainer } from "react-toastify";

const Clientes: React.FC = () => {
  const { obtenerNegocios, changes, setNegocios } = useBussines();
  const [toggle, setToggle] = useState<boolean>(false);
  const [negocioSelect, setNegocioSelect] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [negocio, setNegocio] = useState<NegociosProps[]>([])
  
  useEffect(() => {
    if (negocio && negocio.length > 0 && !negocioSelect) {
      setNegocioSelect(negocio[0].id_negocio);
    }
  }, [negocio, negocioSelect]);
  
  //TODO: Se puede refactorizar, añadiendo esto a un context y distribuir. Se intentó de muchaas formas pero generaba un cliclo infinito del useEffect()
  useEffect(() => {
    const getBussines = async () => {
      try {
        const result = await obtenerNegocios();
        setNegocio(result)
        //TODO: 👇 Este setNegocios() es la funcion modificadora de un state global en el context
        setNegocios(result)
      } catch (error) {
        console.log("error al obtener negocios", error)
      }
    }
    getBussines();
    //TODO:👇 Changes viene del context
  }, [changes])



  return (
    <>
      <div className="w-full h-8 flex justify-between ml-2 mt-2 mb-5 ">
        <ToastContainer />
        <div className="w-5/6">
          <div className=" w-2/5 flex ">
            <span className="flex justify-center items-center w-12 h-8">
              <CiSearch className="size-full text-gray-600" />
            </span>
            <input
              type="search"
              name=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" w-full border-2 border-gray-500 h-8 rounded-lg text-center text-gray-500"
            />
          </div>
        </div>
        <div className="w-2/12 flex justify-end mr-10">
          <select
            id=""
            value={negocioSelect}
            className="w-full border-2 border-gray-500 rounded-lg text-gray-500 text-center"
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
      <div className="h-full flex flex-col items-start ">
        <div className="flex w-full ">
          <h1 className=" text-2xl font-bold text-violet-500  flex w-56 h-14 items-center ml-6 ">
            Customers
          </h1>

          <div className="w-full h-14 flex justify-end gap-2">
            <div className="flex items-center space-x-2">
              <div className=" w-12 h-4">import</div>
              <button className="flex items-center">
                <CiImport className="w-10 h-6" />
              </button>
            </div>

            <div className=" w-40 h-14 flex justify-center items-center">
              <button
                className="bg-violet-500 h-2/4 w-32 rounded-lg text-white"
                onClick={() => setToggle(!toggle)}
              >
                Add customers
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex justify-between">
          <div className=" w-[1000px] h-full">
            <Customer negocioSelect={negocioSelect} />
          </div>
          <div className=" w-[300px] h-2/5">
            <Addcustomers abierto={toggle} setToggle={setToggle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Clientes;
