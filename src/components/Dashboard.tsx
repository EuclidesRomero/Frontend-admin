import Aside from "./Aside";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <h1 className="poppins-light text-2xl font-semibold">
        Bienvenido al panel de administración
      </h1>
      <div className="flex gap-2">
        <div>
          <Aside />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
