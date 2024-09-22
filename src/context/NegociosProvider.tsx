import { createContext, useState } from "react";
import { FC, ReactNode } from "react";
import useAuth from "../hooks/useAuth"
import clienteAxios from "../../config/clienteAxios";
import getAuthConfig from "../../config";




interface NegociosProviderProps {
    children: ReactNode;
}


export interface NegociosProps {
    id_negocio: string,
    nombre_negocio: string,
    id_propietario: string,
    direccion: string,
    descripcion: string,

}

export interface ClienteProps {
    nombre_cliente: string,
    apellido_cliente: string,
    direccion_cliente: string,
    telefono_cliente: string,
    dni_cliente: string,
    clienteid: string
}

export interface DeudoresProps {
    nombre_cliente: string
    apellido_cliente: string
    dni_cliente: string
    id_cliente: string
    id_negocio: string,
    direccion_cliente: string,
    telefono_cliente: string
}


interface AuthContextProps {
    crearNegocio: (nombre: string, direccion: string, descripcion: string) => Promise<{ message: string }>;
    deleteNegocio: (id_negocio: string) => Promise<{ message: string }>;
    editNegocio: (id_negocio: string, nombre: string, descripcion: string, direccion: string) => Promise<{ message: string }>;
    createClient: (id_negocio: string, nombre: string, apellid: string, direccion: string, telefono: string, cedula: string) => Promise<{ message: string }>
    deleteClient: (id_cliente: string) => Promise<{ message: string }>
    getClientes: (id_negocio: string) => Promise<{ result: ClienteProps[] }>;
    getDeudores: (id_negocio: string) => Promise<{ message: DeudoresProps[] }>
    getDetailsDebit: (id_negocio: string, id_cliente: string) => Promise<{ message: [] }>
    obtenerNegocios: () => Promise<NegociosProps[]>
    setChanges: React.Dispatch<React.SetStateAction<boolean>>;
    setChangesClient: React.Dispatch<React.SetStateAction<boolean>>;
    setNegocios: React.Dispatch<React.SetStateAction<NegociosProps[]>>
    addDeuda: (id_negocio: string, id_cliente: string, monto: string, fecha: Date) => Promise<{ message: string }>
    deleteDeuda: (id_negocio: string, id_cliente: string) => Promise<{ message: string }>
    getLinkDeuda: (id_negocio: string, id_cliente: string) => Promise<{ message: string }>
    getClientesQ: () => Promise<{ message: string }>
    getNegociosQ: () => Promise<{ message: string }>
    getDeudaGeneralQ: () => Promise<{ message: string }>
    negocio: NegociosProps[] | undefined;
    changes: boolean;
    changesClient: boolean
    changesDeudor: boolean
    setChangesDeudor: React.Dispatch<React.SetStateAction<boolean>>;
}

const NegocioContext = createContext<AuthContextProps | undefined>(undefined);

const NegocioProvider: FC<NegociosProviderProps> = ({ children }) => {
    const [negocio, setNegocios] = useState<NegociosProps[]>([]);
    const [changes, setChanges] = useState<boolean>(false);
    const [changesClient, setChangesClient] = useState<boolean>(false);
    const [changesDeudor, setChangesDeudor] = useState<boolean>(false);



    const { auth } = useAuth();
    const { id_propietario } = auth;
    const config = getAuthConfig();




    const obtenerNegocios = async () => {
        try {
            const { data } = await clienteAxios.get(`/bussines/get-bussines/${id_propietario}`, config)
            return data
        } catch (error: any) {
            return { message: error.response.data.message || 'Error en la solicitud' };
        }
    }


    const crearNegocio = async (nombre: string, direccion: string, descripcion: string) => {
        try {
            const { data } = await clienteAxios.post('/bussines/crear-negocio', { nombre, direccion, descripcion, id_propietario }, config)
            setChanges(true)
            return data;
        } catch (error) {
            console.log('Error al crear negocio', error)
            return [];
        }
    }

    const deleteNegocio = async (id_negocio: string) => {
        console.log('configuracion', config)
        try {
            const { data } = await clienteAxios.delete(`/bussines/delete-bussines/${id_negocio}`, config);
            setChanges(true)
            return data;
        } catch (error: any) {
            if (error.response) {
                return { message: error.response.data.message || 'Error en la solicitud' };
            }
            else if (error.request) {
                return { message: 'No se recibió respuesta del servidor' };
            } else {
                return { message: error.message || 'Error desconocido' };
            }
        }
    }

    const editNegocio = async (id_negocio: string, nombre: string, descripcion: string, direccion: string) => {
        console.log(id_negocio)
        try {
            const { data } = await clienteAxios.put(`/bussines/uptade-bussines/${id_negocio}`, { nombre, descripcion, direccion }, config);
            setChanges(true)
            return data;
        } catch (error: any) {
            return { message: error.response.data.message || 'Error en la solicitud' };

        }
    }

    const createClient = async (id_negocio: string, nombre: string, apellido: string, direccion: string, telefono: string, cedula: string) => {
        try {
            const { data } = await clienteAxios.post(`/bussines/crear-cliente/${id_negocio}`, { nombre, apellido, direccion, telefono, cedula }, config)
            setChangesClient(true)
            return data;
        } catch (error: any) {
            return { message: error.response.data.message || 'Error en la solicitud' };

        }

    }


    const getClientes = async (id_negocio: string) => {
        try {
            const { data } = await clienteAxios.get(`/bussines/clientes/${id_negocio}`, config);
            return data;
        } catch (error: any) {
            return { message: error.response.data.message || 'Error en la solicitud' };
        }
    }

    const deleteClient = async (id_cliente: string) => {
        try {
            const { data } = await clienteAxios.delete(`/bussines/delete-cliente/${id_cliente}`, config)
            return data;
        } catch (error: any) {
            if (error.response) {
                return { message: error.response.data.message || 'Error en la solicitud' };
            } else if (error.request) {
                return { message: 'No se recibió respuesta del servidor' };
            } else {
                return { message: error.message || 'Error desconocido' };
            }
        }
    }

    const getDeudores = async (id_negocio: string) => {
        try {
            const { data } = await clienteAxios(`bussines/get-deudores/${id_negocio}`, config)
            return data;
        }
        catch (error: any) {
            return { message: error.response.data.message || 'Error en la solicitud' };

        }
    }

    const getDetailsDebit = async (id_negocio: string, id_cliente: string) => {
        try {
            const { data } = await clienteAxios(`/bussines/history/${id_negocio}/${id_cliente}`, config);
            return data
        } catch (error: any) {
            console.log(error)
            return { message: error.response.data.message || 'Error en la solicitud' };
        }
    }

    const addDeuda = async (id_negocio: string, id_cliente: string, monto: string, fecha: Date) => {
        try {
            function formatearNumero(monto: string) {
                return monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }
            const newMonto = formatearNumero(monto);

            const { data } = await clienteAxios.post(`/bussines/crear-deuda/${id_cliente}`,
                { id_negocio, monto: newMonto, fecha_monto: fecha.toISOString() }, config)

            console.log(data)
            return data;
        } catch (error: any) {
            console.log(error)
            return { message: error.response.data.message || 'Error en la solicitud' };
        }
    }

    const deleteDeuda = async (id_negocio: string, id_cliente: string) => {
        console.log(id_negocio, id_cliente, 'Desde el provider ')
        try {
            const { data } = await clienteAxios.delete(`/bussines/eliminar-deuda/${id_negocio}/${id_cliente}`, config)
            return data;
        } catch (error: any) {
            console.log(error)
            return { message: error.response.data.message || 'Error en la solicitud' };
        }

    }

    const getLinkDeuda = async (id_negocio: string, id_cliente: string) => {
        try {
            const { data } = await clienteAxios(`/bussines/getLink-user/${id_negocio}/${id_cliente}`, config)
            return data;
        } catch (error: any) {
            return { message: error.response.data.message || 'Error en la solicitud' };
        }



    }

    const getClientesQ = async () => {
        try {
            const { data } = await clienteAxios(`/bussines/get-clientesQ`, config);
            return data;
        } catch (error: any) {
            return { message: error.response.data.message || 'Error en la solicitud' };

        }


    }
    const getNegociosQ = async () => {
        try {
            const { data } = await clienteAxios(`/bussines/get-bussinesQ`, config);
            return data;
        } catch (error: any) {
            return { message: error.response.data.message || 'Error en la solicitud' };

        }
    }

    const getDeudaGeneralQ = async () => {
        try {
            const { data } = await clienteAxios(`/bussines/get-deudaQ`, config);
            return data;
        } catch (error: any) {
            return { message: error.response.data.message || 'Error en la solicitud' };
        }
    }


    return (
        <NegocioContext.Provider value={{getDeudaGeneralQ, getNegociosQ, getClientesQ, getLinkDeuda, changesDeudor, setChangesDeudor, deleteDeuda, addDeuda, crearNegocio, negocio, deleteNegocio, editNegocio, setNegocios, createClient, getClientes, obtenerNegocios, setChanges, changes, setChangesClient, changesClient, deleteClient, getDeudores, getDetailsDebit, }}>
            {children}
        </NegocioContext.Provider>
    )

}


export { NegocioProvider };
export default NegocioContext;