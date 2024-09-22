import { ClienteProps, NegociosProps } from "../context/NegociosProvider";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import useBussines from "../hooks/useBussines";
import { useNavigate, Link } from "react-router-dom";




const AddDeudor = () => {
    const { obtenerNegocios, changes, setNegocios, getClientes, setChangesClient, changesClient, addDeuda } = useBussines();
    const [negocio, setNegocio] = useState<NegociosProps[]>([])
    const [clientes, setClientes] = useState<ClienteProps[]>([]);
    const [negocioSelect, setNegocioSelect] = useState<string>('');
    const [clienteSelect, setClienteSelect] = useState<string>('')
    const [saldo, setSaldo] = useState<string>('')
    const [fecha, setFecha] = useState<Date | undefined>( undefined)
    const navigate = useNavigate();

    useEffect(() => {
        setFecha(new Date());
      }, []);


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
                //TODO: 👇 Este setNegocios() es la funcion modificadora de un state global en el context
                setNegocios(result)
            } catch (error) {
                console.log("error al obtener negocios", error)
            }
        }
        getBussines();
        //TODO:👇 Changes viene del context
    }, [changes])

    
  useEffect(() => {
    const obtenerClientes = async () => {
      const { result } = await getClientes(negocioSelect);
      setClientes(result);
      setChangesClient(false)
    };
    obtenerClientes();
  }, [negocioSelect, changesClient]);
  

  const handledSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!negocioSelect || !clienteSelect || !saldo || !fecha) {
        toast.error('Todos los campos son obligatorios', {autoClose:2000})
        return
    }
    const normalizeNumber = (value:string) => {
        return parseFloat(value.replace(/\./g, ''));
      };
      const normalizedMonto = normalizeNumber(saldo);
    
      if (normalizedMonto < 1000) {
        return toast.error(`¿Cómo vas a guardar ${saldo}, hey?🤣`);
      }
    

    try {
        const response = await addDeuda(negocioSelect, clienteSelect, saldo, fecha);
        toast.success(response.message, {autoClose:3000})
        setClienteSelect('')
        setSaldo('')
        setTimeout(() => {
            navigate('/dashboard/deudores')
        }, 4000);

      } catch (error:any) {
        console.log(error)
        toast.error(error.response.data.message)
      }
  }

    return (
        <div className="h-full">
            <ToastContainer/>
            <div className="flex justify-start">
                <div>
                    <div className="flex ml-2">
                        <h1 className="text-2xl text-violet-500 font-bold  poppins-light">Añade a un deudor</h1>
                    </div>

                </div>
            </div>

            <div className="w-full  h-3/4 flex justify-center flex-col  ">
                <div className=" border-gray-300 rounded-lg mb-5">
                    <h2 className="poppins-light text-2xl font-semibold mb-2 mt-2">Datos del deudor</h2>
                    <p className="font-semibold poppins-light ">Este paso solo lo harás una vez,
                     luego, en la sección de <span className="text-violet-500 font-bold hover:text-violet-700"><Link to="/dashboard/deudores">deudores</Link></span> , 
                     podrás añadirle un nuevo valor al deudor de manera mas
                     <span className="font-bold text-violet-500"> facil</span></p>
                </div>
                <div className="w-full h-3/4 flex justify-center mt-5">
                    <form className="h-full w-2/5  bg-gray-100 shadow-md py-10 px-4" onSubmit={handledSubmit}>
                        <div className="h-1/4 flex items-center justify-between ">
                            <div className="mr-2">
                                <label htmlFor="" className="font-semibold poppins-light">Selecciona el negocio</label>
                                <select
                                    id=""
                                    value={negocioSelect}
                                    className="w-full rounded-lg h-10 border shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-300"
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
                            <div className="ml-2">
                                <label htmlFor="" className="font-semibold poppins-light">Selecciona el cliente</label>
                                <select
                                    id=""
                                    value={clienteSelect}
                                    className="w-full rounded-lg h-10 border shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-300"
                                    onChange={(e) => {
                                        setClienteSelect(e.target.value);
                                    }}
                                >
                                    {clientes && clientes.length > 0 ? (
                                        <>
                                            <option value="" disabled>
                                                Selecciona el cliente
                                            </option>
                                            {clientes.map((item) => (
                                                <option key={item.clienteid} value={item.clienteid}>
                                                    {item.nombre_cliente}
                                                    {' '}
                                                    { item.apellido_cliente}
                                                </option>
                                            ))}
                                        </>
                                    ) : (
                                        <option value="" disabled>
                                            No hay clientes
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mb-10 mt-5">
                            <label htmlFor="">Selecciona fecha</label>
                            <input type="date" className="w-2/3 h-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-300" 
                            value={fecha ? fecha.toISOString().split("T")[0] : ""} 
                            onChange={(e)=> setFecha(new Date(e.target.value))}/>
                        </div>
                        <div className="flex flex-col items-center mb-10 mt-5">
                            <label htmlFor="">Ingresa el valor</label>
                            <input type="text" className="w-2/3 h-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-300 "
                             value={saldo} 
                             onChange={(e)=>{setSaldo(e.target.value)}}/>
                        </div>
                        <input
                            type="submit"
                            value="Guardar deuda"
                            className="h-10 rounded-lg 
                         bg-blue-500 w-2/3
                         text-white hover:cursor-pointer"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDeudor;
