import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import { ToastContainer, toast } from "react-toastify";


const Register = () => {
  const [nombre, setNombre] = useState('')
  const [identificacion, setIdentificacion] = useState('')
  const [primerApellido, setPrimerApellido] = useState('')
  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')
  
  console.log(import.meta.env.VITE_BACKEND_URL);  
  const register = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if ([nombre, identificacion, primerApellido, correo, contraseña].includes('')) {
      toast.error('Todos los campos son obligatorios', {autoClose:3000, position:"top-center"})
    }
    else {
      try {
        const {data}  = await clienteAxios.post('/propietario/create-propietario', {nombre, primerApellido, correo, contraseña, identificacion});
        setNombre("")
        setIdentificacion("")
        setPrimerApellido("")
        setCorreo("")
        setContraseña("")
        console.log(data)
        toast(data.message, {autoClose: 3000})
      } catch (error) {
        console.log(error)
      }
    }

  }

  return (
  <>
    <Header />
    <ToastContainer />
  <div className="flex justify-center min-h-screen items-start bg-gray-50">
    <div className="bg-white shadow-lg rounded-lg overflow-hidden xl:w-[700px] xl:flex xl:h-auto">
      <div className="xl:w-[350px] p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
          <p className="text-gray-500 mt-2 text-sm">Welcome! Please fill in your details below.</p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              id="name"
              type="text"
              value={nombre}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Apellidos</label>
            <input
              id="surname"
              type="text"
              value={primerApellido}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={e => setPrimerApellido(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="identification" className="block text-sm font-medium text-gray-700">Identificación</label>
            <input
              id="identification"
              type="text"
              value={identificacion}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={e => setIdentificacion(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              id="email"
              type="email"
              value={correo}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={e => setCorreo(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              value={contraseña}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={e => setContraseña(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="terms" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I accept all terms and conditions
            </label>
          </div>

          <div className="mt-4">
            <input
              type="submit"
              value="Sign Up"
              className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
              onClick={register}
            />
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
          </p>
        </form>
      </div>

      <div className="hidden xl:block xl:w-[350px]">
        <img
          src="/img/loginimag.jpg"
          className="w-full h-full object-cover"
          alt="Registration Illustration"
        />
      </div>
    </div>
  </div>
</>

  
  );
};

export default Register;
