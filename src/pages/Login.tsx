import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import Header from "../components/Header";
import { ToastContainer, toast} from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [correo, setCorreo] = useState(''); 
  const [contraseña, setContraseña]= useState('');
  const navigate = useNavigate(); 

  const ingresar = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if ([correo, contraseña].includes("") || typeof correo !== "string" || typeof contraseña !== "string") {
      toast.error('Todos los campos son obligatorios', {
        autoClose: 3000,
        position:"top-center"
      })
    }
  try {
    const {data} = await clienteAxios.post('/propietario/login', {correo, contraseña})
    localStorage.setItem('token', data.token)
    navigate('/dashboard'); 
    window.location.reload();
    } catch (error) {
    if (error instanceof Error) {
      const err = error as any;
      toast.error(err.response.data.message ,{
        autoClose: 3000,
        position:"top-center"
      })
    }
  }
  }

  return (
    <>
    <Header />
    <div className="mx-auto my-0 w-[450px] h-20 -mt-12" >
    <ToastContainer />
    </div>
    <div className="xl:flex xl:justify-center xl:flex-col xl:items-center xl:-mt-10">
      <div className="xl:flex xl:justify-center xl:flex-row mb-2 flex justify-between xl:w-[900px]">
        <div className="">
          <h1 className="text-2xl mt-10 mb-5">
            Inicia sesion y empieza a{" "}
            <span className="text-yellow-500 ">Administrar</span>
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center xl:flex xl:justify-between xl:h-[500px] xl:w-[700px] xl:border 2 border-gray-300">
        <div className="w-auto">
          <form
            action=""
            className="flex flex-col xl:w-96 xl:h-[400px] xl:justify-center"
            >
            <div className="flex flex-col mb-10 mt-5 relative xl:flex items-center">
              <p className="text-2xl font-bold mt-10">Sign Up to FinanceFlow</p>
            </div>
            <div className="flex flex-col mb-5 relative xl:flex items-center ">
              <label
                htmlFor=""
                className=" -top-4  left-3 bg-white text-gray-400 "
                >
                Correo
              </label>
              <input
                type="text"
                className="xl:w-4/6 w-60  border-2 border-gray-300 h-10 text-black text-center"
                value={correo}
                onChange={e=> setCorreo(e.target.value)}
                placeholder="example@gmail.com"
                
                />
            </div>
            <div className="flex justify-end"><Link to="/olvide-contraseña" className="mr-16 font-semibold">Forgot?</Link></div>
            <div className="flex flex-col mb-10 relative xl:flex items-center ">
              <label
                htmlFor=""
                className=" -top-4  left-3 bg-white text-gray-400"
                >
                Contraseña
              </label>
              <input
                type="password"
                className="xl:w-4/6 w-60 border-2 border-gray-300 h-10 text-black text-center"
                value={contraseña}
                onChange={e=> setContraseña(e.target.value)}
                placeholder="*****************"
                />
            </div>
            <div>
              <input
                type="button"
                value="log In"
                onClick={ingresar}
                className="bg-black xl:w-4/6  w-60  h-10 border-2 mb-4 hover:cursor-pointer   text-white"
              />
            </div>
          </form>
          <div className="mt-5">
            {" "}
            <p>
            Don't have an account? <span className="text-blue-500"> <Link to="/register">Sign up</Link></span>
            </p>
          </div>
        </div>
        <div className="hidden lg:block">
          <img
            src="/img/loginimag.jpg"
            className="xl:h-[500px] w-[550px] object-cover"
            alt=""
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
