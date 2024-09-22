import { useEffect, useState } from "react";
import "../ScrollStyle.css";
import useBussines from "../hooks/useBussines";
import { ClienteProps } from "../context/NegociosProvider";
import {toast } from "react-toastify";

type customerProps = {
  negocioSelect: string;
};

const Customer = ({ negocioSelect }: customerProps) => {
  const { getClientes, changesClient, deleteClient, setChangesClient } = useBussines();
  const [clientes, setClientes] = useState<ClienteProps[]>([]);

  const deleteOneClient = (id_cliente:string) => async  (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const result = confirm('¿Quieres eliminar este cliente?')
      if (result) {
        const response  = await deleteClient(id_cliente)
        setChangesClient(true)
        toast.info(response.message, {autoClose: 3000})
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Error desconocido en cliente';
        toast.error(errorMessage, { autoClose: 3000 });
        console.log('Error en customer.tsx:', errorMessage);
    }

  }

  useEffect(() => {
    const obtenerClientes = async () => {
      const { result } = await getClientes(negocioSelect);
      setClientes(result);
      setChangesClient(false)
    };
    obtenerClientes();
  }, [negocioSelect, changesClient]);


  

  return (
      <div className="flex w-full h-full">
      <div className="w-full h-full overflow-auto p-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 ">Nombre</th>
              <th className="p-2 ">Apellido</th>
              <th className="p-2 ">Dirección</th>
              <th className="p-2 ">Identificación</th>
              <th className="p-2">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            
            {Array.isArray(clientes) &&
              clientes.map((item) => (
                <tr key={item.clienteid}>
                  <td>{item.nombre_cliente}</td>
                  <td>{item.apellido_cliente}</td>
                  <td>{item.direccion_cliente}</td>
                  <td>{item.dni_cliente}</td>
                  <td>{item.telefono_cliente}</td>
                  <td>
                    <button className="p-2 text-red-500 font-bold" onClick={deleteOneClient(item.clienteid)}>Eliminar</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
    </div>
    </div>
  );
};

export default Customer;
