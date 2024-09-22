import useAuth from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom";


const RutaProtegida = () => {
  const {auth, loading} = useAuth();
  const { uuid_propietario } = auth;
  if (loading) return <div>Cargando...</div>; 
  
  return (
    <>
      {uuid_propietario? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default RutaProtegida
