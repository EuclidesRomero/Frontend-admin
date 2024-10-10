import useAuth from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";


const RutaProtegida = () => {
  const {auth, loading} = useAuth();
  const { uuid_propietario } = auth;
  if (loading) return <div><Loading type= 'spin' color='blue' /> </div>; 
  
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
