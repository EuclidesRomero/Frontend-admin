import { createContext } from "react";
import { FC, ReactNode, useEffect, useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";

interface AuthProviderPros {
  children: ReactNode;
}

interface AuthProps {
  uuid_propietario: string | null;
}

interface AuthContextProps {
  auth: AuthProps;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const AuthProvider: FC<AuthProviderPros> = ({ children }) => {
  const [auth, setAuth] = useState<AuthProps>({ uuid_propietario: null });
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setLoading(false)
        console.log('No hay token')
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
        console.log('data desde authProvider.tsx', data)
        setAuth(data);
        console.log("Redirigiendo a /dashboard");
        navigate('/dashboard')
      } catch (error) {
        setAuth({ uuid_propietario: null });
      }
      setLoading(false)
    }
    autenticarUsuario();

  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading
      }}>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthProvider };

export default AuthContext;
