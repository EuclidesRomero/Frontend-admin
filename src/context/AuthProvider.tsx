import { createContext } from "react";
import { FC, ReactNode, useEffect, useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";

interface AuthProviderPros {
  children: ReactNode;
}

interface AuthProps {
  uuid_propietario: string | null;
  id_propietario: string;
  nombre_propietario: string;
  primer_apellido_propietario: string;
  correo:string,
  
}

const initialAuthState: AuthProps = {
  uuid_propietario: null,
  id_propietario:"",
  nombre_propietario: "", 
  primer_apellido_propietario: "", 
  correo: "",
};

interface AuthContextProps {
  auth: AuthProps;
  loading: boolean;
  LogOut: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const AuthProvider: FC<AuthProviderPros> = ({ children }) => {
  const [auth, setAuth] = useState<AuthProps>(initialAuthState);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setLoading(false)
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const { data } = await clienteAxios('propietario/obtener-propietario', config)
        setAuth(data);
        navigate('/dashboard/perfil')
      } catch (error) {
        setAuth({
          uuid_propietario: null,
          id_propietario: "",
          nombre_propietario: "", 
          primer_apellido_propietario: "",
          correo: ""
        });
      }
      setLoading(false)
    }
    autenticarUsuario();

  }, [])


  const LogOut = () => {
    localStorage.removeItem('token')
    window.location.href = '/login';
  }


  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        LogOut
      }}>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthProvider };

export default AuthContext;
