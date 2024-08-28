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


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<RutaProtegida />}>
            <Route index element={<Dashboard />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="deudores" element={<Deudores />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="pedidos" element={<WhatsappAdmin />} />
            <Route path="sms-to-deudores"element={<SedMessage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
