import useAuth from "../hooks/useAuth";
import Aside from "./Aside";
import { Outlet } from "react-router-dom";
import {obtenerFecha} from '../helpers/dateNow'

const Dashboard = () => {
  const {auth} = useAuth()
  const {nombre_propietario} = auth;
  return (
    <>
      <div className="flex gap-2">
        <div>
          <Aside />
        </div>
        <div className="w-full h-[1080px] flex flex-col bg-gray-100 rounded-2xl border-l border-t  border-gray-300">
          <div className="mb-2 h-[94.5px] flex flex-col items-start ">
            {" "}
            <h1 className="poppins-light text-2xl font-semibold mt-5 ml-2">
              Hey, {nombre_propietario}!
            </h1>
            <div className="flex">
            <p className="text-gray-500 ml-2">{obtenerFecha()}</p>
          </div>
          </div>
         { <div className="border-b-2 -mt-1"></div> }
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
