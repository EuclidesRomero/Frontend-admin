import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import { ToastContainer, toast } from "react-toastify";


const Register = () => {
  const [nombre, setNombre] = useState('')
  const [identificacion, setIdentificacion] = useState('')
  const [apellido, setApellido] = useState('')
  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')
  

  const register = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if ([nombre, identificacion, apellido, correo, contraseña].includes('')) {
      toast.error('Todos los campos son obligatorios', {autoClose:3000, position:"top-center"})
    }
    else {
      try {
        const {data}  = await clienteAxios.post('/propietario/create-propietario', {nombre, identificacion, apellido, correo, contraseña});
        console.log(data) 
      } catch (error) {
        console.log(error)
      }
    }

  }

  return (
    <>
    <Header />
    <ToastContainer />
    <div className="xl:flex justify-center  ">
      <div className="xl:w-[900px] xl:h-[555px] xl:flex xl:items-center xl:border 2 border-gray-300 mt2">
        <div className="xl:w-[450px] xl:h-[650px] xl:flex xl:flex-col">
          <div className="xl:w-[450px] xl:h-10 mb-14">
            <p className="xl:text-2xl xl:font-bold">Create Your Account</p>
            <p className="text-gray-400 mt-5">
              Welcome back! Please enter your details
            </p>
          </div>
          <form className="xl:h-[550px] flex flex-col gap-2 items-center">
            <label htmlFor="name" className="xl:w-4/6">Nombre</label>
            <input
              id="name"
              type="text"
              value={nombre}
              className="xl:w-64 xl:h-10 border-2 border-gray-300"
              onChange={e => setNombre(e.target.value)}
              />

            <label htmlFor="surname">Apellidos</label>
            <input
              id="surname"
              type="text"
              value={apellido}
              className="xl:w-64 xl:h-10 border-2 border-gray-300"
              onChange={e => setApellido(e.target.value)}
              />

            <label htmlFor="identification">Identificación</label>
            <input
              id="identification"
              type="text"
              value={identificacion}
              className="xl:w-64 xl:h-10 border-2 border-gray-300"
              onChange={e => setIdentificacion(e.target.value)}
            />

            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              value={correo}
              className="xl:w-64 xl:h-10 border-2 border-gray-300"
              onChange={e => setCorreo(e.target.value)}
              />

            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={contraseña}
              className="xl:w-64 xl:h-10 border-2 border-gray-300"
              onChange={e => setContraseña(e.target.value)}
              />

            <label htmlFor="terms">
              <input type="checkbox" id="terms" />
              {' '} I accept all terms and conditions.
            </label>

            <div className="text-white xl:w-64 xl:h-7 xl:flex">
              <input
                type="submit"
                value="Sign Up"
                className="hover:cursor-pointer bg-black  xl:h-10 xl:w-64 w-44 h-8"
                onClick={register}
                />
            </div>
          <p className="pt-2">
            Already have an account?{" "}
            <span className="text-blue-black font-bold">
              <Link to="/login">Log in</Link>
            </span>
          </p>
          </form>

        </div>

        <div className=" hidden xl:block xl:w-[450px] xl:h-[550px]">
          <img
            src="/img/loginimag.jpg"
            className=" hiden xl:h-[550px] w-[550px] object-cover"
            alt="Registration Illustration"
            />
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
