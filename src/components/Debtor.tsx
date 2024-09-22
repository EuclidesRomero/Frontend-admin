import React, { useEffect, useState } from "react";
import { DeudoresProps } from "../context/NegociosProvider";
import useBussines from "../hooks/useBussines";
import { formatearFecha } from "../helpers/formatDate";
import { formatearDinero } from "../helpers/formatearDinero";
import { CiLink } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { toast } from "react-toastify";
import { IoIosAddCircleOutline } from "react-icons/io";






interface DebtorProps {
    deudor: DeudoresProps[];
    setOpen: React.Dispatch<React.SetStateAction <boolean>>
    open:boolean
    setDeudaData: React.Dispatch<React.SetStateAction <string[]>>

}

interface detailsProps {
    monto: string;  
    fecha_monto: string
}

const Debtor = ({ deudor, setOpen, open, setDeudaData}: DebtorProps) => {
    const { getDetailsDebit, deleteDeuda, setChangesDeudor, getLinkDeuda } = useBussines();
    const [toggle, setToggle] = useState<boolean>(false);
    const [details, setDetails] = useState<detailsProps[]>([]);
    const [id_negocio, setId_negocio] = useState<string>('')
    const [id_cliente, setId_cliente] = useState<string>('')
    const [copied, setCopied] = useState(false);


    useEffect(()=> {
        setToggle(false)
        setOpen(false)
    }, [])

    const setValues = (id_negocio: string, id_cliente: string) => {
        setId_negocio(id_negocio)
        setId_cliente(id_cliente)
        if (toggle == false) {
            setToggle(true)
        } else {
            setToggle(false)
        }
    }

    const setDedudaData = (id_negocio:string, id_cliente:string) => {
        setOpen(!open)
        setDeudaData([id_negocio, id_cliente])
    }

    useEffect(() => {
        if (id_negocio && id_cliente) {
            const getDetails = async () => {
                const response = await getDetailsDebit(id_negocio, id_cliente);
                setDetails(response.message)
                console.log('ejecucion del effecto')
            }
            getDetails();
        }
    }, [id_negocio, id_cliente, toggle])
    
    const convertirMonto = (montoStr: string): number => {
        return parseFloat(montoStr.replace(/[^0-9,-]+/g, '').replace(',', '.'));
    };
    const totalSaldos = details.reduce((sum, item) => sum + convertirMonto(item.monto), 0);

    const eliminardeuda = (id_negocio:string, id_cliente:string) => 
     async (event: React.MouseEvent<HTMLButtonElement>) => {
        setToggle(false)
        setOpen(false)
        event.preventDefault();
        if (!id_negocio || !id_cliente) {
            console.log('Ha ocurrido un error al eliminar este cliente')
        }
        const result:boolean = confirm('Quieres eliminar esta deuda?')
        if(result){
            try {
                const response = await deleteDeuda(id_negocio, id_cliente);
                toast.success(response.message, {autoClose: 3000})
                setChangesDeudor(true) 
            } catch (error) {
                toast.error('Error eliminando la deuda');
            }
        } 
    }

    const getLink = (id_negocio:string, id_cliente:string) => 
    async (event: React.MouseEvent<HTMLButtonElement>) =>  {
        event.preventDefault();
        try {
            const response = await getLinkDeuda(id_negocio,id_cliente );
            navigator.clipboard.writeText(response.message).then(() => {
                setCopied(true); 
                toast.success('Has copiado el link con exito, envialo a tu cliente', {autoClose:3000})
                setTimeout(() => setCopied(false), 3000);
              }).catch((err) => {
                console.error('Error al copiar:', err);
              });
            }
         catch (error) {
            toast.success('error al copiar link deuda', {autoClose: 3000})
        }
        
    }
    


    return (
        <>  
            <div className="flex w-full  h-full justify-between  ">
            
                <div className=" w-4/5 overflow-y-scroll scrollbar-hide">
                    {deudor.length > 0 ? (
                        <div className="w-full h-full overflow-aut p-4">
                            <div className="w-full flex justify-end mb-2">
                                {copied && <p className="text-white mt-2 bg-violet-400 w-56">¡Texto copiado al portapapeles!</p>}
                            </div>
                            <table className=" w-full border border-gray-200">
                                <thead>
                                    <tr className="border-b bg-gray-100">
                                        <th className="p-2 ">Nombre</th>
                                        <th className="p-2 ">Apellido</th>
                                        <th className="p-2">Dirección</th>
                                        <th className="p-2">Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(deudor) &&
                                        deudor.map((item) => (
                                            <tr key={item.id_cliente}>
                                                <td>{item.nombre_cliente}</td>
                                                <td>{item.apellido_cliente}</td>
                                                <td className="pr-2">{item.direccion_cliente}</td>
                                                <td className="p-2">{item.telefono_cliente}</td>
                                                <td>
                                                    <button className="p-2 text-red-500 font-bold" onClick={eliminardeuda(item.id_negocio, item.id_cliente)}>
                                                       <MdDelete className="text-2xl font-bold"/>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="p-2 text-blue-400 font-bold" onClick={getLink(item.id_negocio, item.id_cliente)}>
                                                        <CiLink className="text-2xl font-bold"/>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="p-2 text-blue-400 font-bold" onClick={()=>setDedudaData(item.id_negocio, item.id_cliente) } >
                                                    <IoIosAddCircleOutline className="text-2xl font-bold" />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="p-2 text-blue-400 font-bold" onClick={() => setValues(item.id_negocio, item.id_cliente)}>
                                                    <CgDetailsMore className="text-2xl font-bold" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                        <div className="flex items-center  w-2/3 h-10 rounded-lg">
                          <p className="font-bold text-xl flex-grow poppins-light">
                            En este negocio no hay deudores aún
                          </p>
                          
                        </div>
                      </div>
                      
                    )}

                </div>
                {details.length > 0 && (
                    <div className={`w-3/12   mt-3 overflow-hidden transition-all duration-500 ease-in-out ${toggle ? 'opacity-100 max-h-[800px]' : 'max-h-0 opacity-0'
                        }  overflow-y-scroll scrollbar-hide`}>
                        <div className="mb-5">
                            <h2 className="font-bold text-violet-500">Detalle de factura</h2>
                        </div>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="border-b bg-gray-100">
                                    <th className="p-2">Monto</th>
                                    <th className="p-2">Fecha de la Factura</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">{item.monto}</td>
                                        <td className="p-2">{formatearFecha(item.fecha_monto)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="p-2 font-bold">Total</td>
                                    <td className="p-2 font-bold">{formatearDinero(totalSaldos)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="bg-red-500 w-full rounded-lg text-white" onClick={()=> setToggle(false)}>Cerrar</button>
                    </div>
                )}
                
            </div>

        </>
    );
};

export default Debtor;
