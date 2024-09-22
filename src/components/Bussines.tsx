import '../ScrollStyle.css'
import React, { useEffect, useState } from "react";
import { NegociosProps } from '../context/NegociosProvider';
import useBussines from "../hooks/useBussines";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete, MdEdit, MdEditOff } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { IoStorefrontOutline } from "react-icons/io5";




const Bussines = () => {
  const { crearNegocio, deleteNegocio, editNegocio, obtenerNegocios, changes, setChanges } = useBussines();
  const [idNegocio, setIdNegocio] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [actualizar, setActualizar] = useState<Boolean>(false);
  const [negocio, setNegocio] = useState<NegociosProps[]>([])
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  //TODO: Se puede refactorizar, añadiendo esto a un context y distribuir. Se intentó de muchaas formas pero generaba un ciclo infinito del useEffect()
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
    setChanges(false);
  }, [changes])

  const handledClick: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    if ([nombre, direccion, descripcion].includes("")) {
      toast.error("Todos los campos son obligatorios", { autoClose: 3000 });
    }
    try {
      const result = await crearNegocio(nombre, direccion, descripcion);
      setNombre("");
      setDescripcion("");
      setDireccion("");
      toast.info(result.message, { autoClose: 3000 });
      setChanges(true);
    } catch (error) {
      console.log(error);
    }
  };



  const handledDelete = (id_negocio: string) =>
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      try {
        const acept: boolean = confirm('Al eliminar este negocio, eliminarás todos sus clientes')
        if (acept) {
          const result = await deleteNegocio(id_negocio);
          toast.info(result.message, { autoClose: 3000 })
          setChanges(true);
        }
      } catch (error) {
        console.log(error)
        toast.error('Error al eliminar el negocio', { autoClose: 3000 });
      }
    };




  const createEditHandler =
    (
      id_negocio: string,
      nombre_negocio: string,
      descripcion: string,
      direccion: string
    ) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!actualizar) {
          setActualizar(true);
          setIdNegocio(id_negocio);
          setNombre(nombre_negocio);
          setDescripcion(descripcion);
          setDireccion(direccion);
        } else {
          setActualizar(false);
          setIdNegocio("");
          setNombre("");
          setDescripcion("");
          setDireccion("");
        }
      };

  const handledEdit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const result = await editNegocio(idNegocio, nombre, descripcion, direccion)
      toast.info(result.message, { autoClose: 3000 })
    } catch (error) {
      toast.error('Error al editar el negocio', { autoClose: 3000 });
    }
    setActualizar(false)
    setIdNegocio("")
    setNombre("");
    setDescripcion("");
    setDireccion("");
  }



  return (
    <div className="flex scroll-container">
      <div className="w-2/3 h-[900px] ">
        <div className='flex ml-2 text-violet-500  justify-start'>
          <h1 className="  font-bold text-xl mb-4 mt-2 poppins-light">
            {negocio && negocio.length > 0
              ? "Estos son tus negocios"
              : "No hay negocios aún. Registra uno"}
          </h1>
        </div>
        {Array.isArray(negocio) && negocio.map((item) => (
          <div key={item.id_negocio} className=" border-2 mb-3 flex rounded-lg ml-2">
            <div className=" flex h-20 flex-col ">
              <div className="h-20 w-12 flex items-start text-gray-900">
                <IoStorefrontOutline className="w-full h-full ml-2 text-violet-500" />
              </div>
            </div>
            <div className=" w-full flex flex-col">
              <div className="w-full h-10 flex justify-center items-end mb-2">
                <div className="w-2/3 flex flex-col">
                  <p className="font-bold text-black">{item.nombre_negocio}</p>
                </div>
              </div>
              <div className="w-full h-10 flex">
                <div className=" w-full flex justify-center ">
                  <p className="">{item.direccion}</p>
                </div>
              </div>
            </div>
            <div className=" w-2/4 flex justify-center items-center flex-col ">
              <p className="font-bold text-black">Descripcion:</p>
              <p>{item.descripcion}</p>
            </div>
            <div className={` w-20 flex justify-center flex-col items-center ${toggleMenu ? 'xl:block' : 'hidden'}`}>
              <div className=" w-1/6 text-red-400 ml-2 mt-2">
                <button onClick={handledDelete(item.id_negocio)}><MdDelete className="size-[30px]" /></button></div>
              <div className="w-1/6 ml-2 ">
                <button onClick={createEditHandler(item.id_negocio, item.nombre_negocio, item.descripcion, item.direccion)}>{!actualizar ? <MdEdit className="size-[30px]" /> : <MdEditOff className="size-[30px] text-blue-950" />}</button>
              </div>
            </div>
            <div>
              <button className='h-full ' onClick={() => setToggleMenu(!toggleMenu)}><IoMdMore className="size-[30px] " /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-1/3 gap-x-2 flex flex-col">
        <div className=" w-full h-32 flex justify-center items-center ">
          <h1 className="text-lg font-bold">
            {!actualizar ? 'Puedes crear tus negocios aquí' : 'Puedes editar los datos de tu negocio aquí'}
          </h1>
        </div>
        <form className="w-full h-2/3 text-lg font-semibold  ">
          <ToastContainer />
          <p className="mb-2 font-bold">{!actualizar ? 'Llena los datos de tu negocio aqui' : 'Edita los datos aquí'}</p>
          <div className="flex flex-col justify-center items-center w-full">
            <label htmlFor="">Nombre del negocio</label>
            <input
              type="text"
              className="h-10 w-2/3 rounded-lg"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <label htmlFor="">Descripcion</label>
            <textarea
              className="w-2/3 h-10 rounded-lg"
              name=""
              id=""
              cols={30}
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <label htmlFor="">Direccion</label>
            <input
              className="w-2/3 h-10 rounded-lg"
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className=" h-24 flex items-end justify-center">
            <button
              className="bg-black text-white h-10 w-2/3 rounded-lg"
              onClick={!actualizar ? handledClick : handledEdit}
            >
              {!actualizar ? 'Crear negocio' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bussines;
