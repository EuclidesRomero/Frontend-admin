import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"
import useBussines from "../hooks/useBussines";
import { formatearDinero2 } from "../helpers/formatearDinero";


const Perfil = () => {
  const { auth, } = useAuth();
  const { getClientesQ, changesClient, getNegociosQ, changes, getDeudaGeneralQ } = useBussines();
  const [Qclientes, setQclientes] = useState<string>('');
  const [Qnegocios, setQnegocios] = useState<string>('');
  const [QDeuda, setQDeuda] = useState<string>('');


  const { nombre_propietario, primer_apellido_propietario, correo, id_propietario } = auth;



  useEffect(() => {
    const getClientesQuantiy = async () => {
      const response = await getClientesQ();
      setQclientes(response.message)
    }
    getClientesQuantiy();

  }, [changesClient])

  useEffect(() => {
    const getbussinesQ = async () => {
      const response = await getNegociosQ();
      setQnegocios(response.message)
    }
    getbussinesQ();
  }, [changes])

  useEffect(() => {
    const getDeudaQ = async () => {
      const response = await getDeudaGeneralQ();
      setQDeuda(response.message)
    }
    getDeudaQ();
  }, [])

  const cantidad = parseFloat(QDeuda);



  return (
    <>
      <h1 className="w-full h-16 text-4xl font-extrabold text-violet-700 mb-12 text-center mt-4">
        Información General
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center border border-gray-200">
          <p className="text-xl font-semibold text-violet-600 mb-4">Negocios Registrados</p>
          <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-gray-200 w-full">
            <p className="text-6xl font-bold ">{Qnegocios}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center border border-gray-200">
          <p className="text-xl font-semibold text-violet-600 mb-4">Deuda General</p>
          <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-gray-200 w-full overflow-hidden">
            <p className="text-4xl font-bold  ">{formatearDinero2(cantidad)}</p>
          </div>
        </div>



        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center border border-gray-200">
          <div className="w-full">
            <div className="bg-gray-50 p-4 rounded-lg mb-3 text-center border border-gray-300">
              <p className="font-medium text-lg">{nombre_propietario}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-3 text-center border border-gray-300">
              <p className="font-medium text-lg">{primer_apellido_propietario}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-3 text-center border border-gray-300">
              <p className="font-medium text-lg">{correo}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-300">
              <p className="font-medium text-lg">{id_propietario}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center border border-gray-200">
          <p className="text-xl font-semibold text-violet-600 mb-4">Cantidad de clientes</p>
          <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-gray-200 w-full">
            <p className="text-6xl font-bold ">{Qclientes}</p>
          </div>
        </div>
      </div>
    </>

  );
}

export default Perfil
