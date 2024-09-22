import React, { useEffect, useState } from "react";
import useBussines from "../hooks/useBussines";
import { toast } from "react-toastify";

interface AddcustomersProps {
  abierto: boolean;  
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const Addcustomers = ({abierto, setToggle}: AddcustomersProps) => {
const {negocio, createClient, setChangesClient} = useBussines();
const [idNegocio, setIdNegocio] = useState<string>('');
const [nombre, setNombre] = useState<string>('');
const [apellido, setApellido] = useState<string>('');
const [direccion, setDireccion] = useState<string>('');
const [telefono, setTelefono] = useState<string>('');
const [documento, setDocumento] = useState<string>('');



  const handledSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if ([idNegocio, nombre, apellido, direccion, telefono, documento].includes('') ) {
      toast.error('Llena todos los campos', {autoClose:3000})
      return
    }

    try {
      const result = await createClient(idNegocio, nombre, apellido, direccion, telefono, documento)
      toast.success(result.message, {autoClose: 3000})
      setChangesClient(true)
      setIdNegocio('')
      setNombre('')
      setApellido('')
      setIdNegocio('')
      setDireccion('')
      setTelefono('')
      setDocumento('')

      setTimeout(() => {
        setToggle(false)
      }, 4000);

    } catch (error) {
      if (error instanceof Error) {
       console.log('Mensaje de error:', error.message);
       toast.error('Error al crear negocio', {autoClose: 3000})
      }
    }

  };

  useEffect(() => {
    if (negocio && negocio.length > 0 && !idNegocio) {
      setIdNegocio(negocio[0].id_negocio);
    }
}, [negocio, idNegocio]);

  return (
    <form
      action=""
      onSubmit={handledSubmit}
      className={`border-2 border-gray-100 shadow-sm w-full h-80 flex rounded-lg justify-center ${
        abierto ? "xl:block" : "xl:hidden"
      }`}
    > 
      <h2 className="font-semibold mb-5 m-2 text-lg">
        Llena los datos de tu cliente
      </h2>
      <p className="mb-5 font-bold">Selecciona el negocio</p>
      <div className="w-full flex justify-center mr-10 mb-5">
        <select
          name="Select"
          id=""
          className="w-60 border-2 border-gray-500 rounded-lg text-gray-500 text-center"
          value={idNegocio}
          onChange={(e) => {
            setIdNegocio(e.target.value);
          }}
        > //TODO: 👇 Aquí utilizo el valor de negocio que viene del context 
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

      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          value={nombre}
          placeholder="Nombre"
          className="w-60 h-7 text-center rounded-lg"
          onChange={(e) => {
            setNombre(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          value={apellido}
          placeholder="Apellido"
          className="w-60 h-7 text-center rounded-lg"
          onChange={(e) => {
            setApellido(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          value={direccion}
          placeholder="Direccion"
          className="w-60 h-7 text-center rounded-lg"
          onChange={(e) => {
            setDireccion(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col items-center  mb-4">
        <input
          type="text"
          value={telefono}
          placeholder="Teléfono"
          className="w-60 h-7 text-center rounded-lg"
          onChange={(e) => {
            setTelefono(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          value={documento}
          placeholder="Documento"
          className="w-60 h-7 text-center rounded-lg"
          onChange={(e) => {
            setDocumento(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col items-center mb-4">
        <input
          type="submit"
          value="Guardar cliente"
          className="w-60 h-7 items-center bg-violet-500 rounded-lg text-white cursor-pointer"
        />
      </div>
    </form>
  );
};

export default Addcustomers;
