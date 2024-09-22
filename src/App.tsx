import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import "./index.css";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./components/Dashboard.tsx";
import RutaProtegida from "./layouts/RutaProtegida.tsx";
import Clientes from "./components/Clientes.tsx";
import Deudores from "./components/Deudores.tsx";
import Perfil from "./components/Perfil.tsx";
import WhatsappAdmin from "./components/WhatsappAdmin.tsx";
import { SedMessage } from "./components/SedMessage.tsx";
import Bussines from "./components/Bussines.tsx";
import AddDeudor from "./components/AddDeudor.tsx";
import { NegocioProvider } from "./context/NegociosProvider.tsx";
import Confirmar from "./pages/confirmar.tsx";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NegocioProvider>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirmar/:token" element= {<Confirmar/>} />
            <Route path="/dashboard" element={<RutaProtegida />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="clientes" element={<Clientes />} />
                <Route path="deudores" element={<Deudores />} />
                <Route path="add-deudor" element={<AddDeudor />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="pedidos" element={<WhatsappAdmin />} />
                <Route path="sms-to-deudores" element={<SedMessage />} />
                <Route path="negocios" element={<Bussines />} />
              </Route>
            </Route>
          </Routes>
        </NegocioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
