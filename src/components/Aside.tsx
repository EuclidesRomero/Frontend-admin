import { FaUserCircle } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { FcSms } from "react-icons/fc";
import { MdOutlinePostAdd } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { FaStoreAlt } from "react-icons/fa";


import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Aside = () => {
  const { auth, LogOut } = useAuth();
  const { nombre_propietario, primer_apellido_propietario, correo } = auth;
  return (
    <>
      <aside className="w-[320px] h-full bg-gray-50 rounded-xl">
        <div className="flex justify-centerc gap-5">
          <div className="w-8 mt-5 ml-2">
            <FaUserCircle className="size-7 mt-2" />
          </div>
          <div className="mt-5">
            <p>
              Welcome{" "}
              <span className="font-bold text-xl">
                {nombre_propietario} {primer_apellido_propietario}
              </span>
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-500 mb-5">{correo}</p>
        </div>
        <div className="border-b-2 "></div>
        <div className="flex flex-col h-[772px]">
          <ul className="flex flex-col justify-evenly items-center mt-10 ">
            <div className="w-full flex">
              <div className="w-2/12 h-11 flex justify-center items-center">
                <FaUserAlt className="size-7 mt-2" />
              </div>
              <div className="w-full flex">
                <div className=" m-2 w-full flex">
                  <li className="mb-5 text-gray-500 font-bold   mt-2">
                    <Link to="perfil">Profile</Link>
                  </li>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-2/12 h-11 flex justify-center items-center">
                <FaStoreAlt className="size-8 mt-2" />
              </div>
              <div className="w-full flex justify-center items-center ">
                <div className=" m-2 w-full flex">
                  <button  className="mb-5 text-gray-500 font-bold  mt-2">
                    <Link to="negocios">Mis negocios</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-2/12 h-11 flex justify-center items-center">
                <PiUsersThreeFill className="size-8 mt-2" />
              </div>
              <div className="w-full flex justify-center items-center">
                <div className=" m-2 w-full flex">
                  <li className="mb-5 text-gray-500 font-bold  mt-2">
                    <Link to="clientes">Clientes</Link>
                  </li>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-2/12 h-11 flex justify-center items-center">
                <BiBookContent className="size-8 mt-2" />
              </div>
              <div className="w-full flex justify-center items-center ">
                <div className=" m-2 w-full flex">
                  <li className="mb-5 text-gray-500 font-bold mt-2">
                    <Link to="deudores">Deudores</Link>
                  </li>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-2/12 h-11 flex justify-center items-center">
                <MdOutlinePostAdd className="size-8 mt-2" />
              </div>
              <div className="w-full flex justify-center items-center ">
                <div className=" m-2 w-full flex">
                  <li className="mb-5 text-gray-500 font-bold  mt-2">
                    <Link to="add-deudor">Añade a un deudor</Link>
                  </li>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-2/12 h-11 flex justify-center items-center">
                <MdOutlineDeliveryDining className="size-8 mt-2" />
              </div>
              <div className="w-full flex justify-center items-center ">
                <div className=" m-2 w-full flex">
                  <li className="mb-5 text-gray-500 font-bold  mt-2">
                    <Link to="pedidos">Pedidos</Link>
                  </li>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-2/12 h-11 flex justify-center items-center">
                <FcSms className="size-8 mt-2" />
              </div>
              <div className="w-full flex justify-center items-center ">
                <div className=" m-2 w-full flex">
                  <li className="mb-5 text-gray-500 font-bold  mt-2">
                    <Link to="sms-to-deudores">Envia sms a tus deudores</Link>
                  </li>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-2/12 h-11 flex justify-center items-center">
                <IoLogInOutline className="size-8 mt-2" />
              </div>
              <div className="w-full flex justify-center items-center ">
                <div className=" m-2 w-full flex">
                  <button className="mb-5 text-gray-500 font-bold  mt-2" onClick={LogOut}>
                    Salir
                  </button>
                </div>
              </div>
            </div>
            
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Aside;
