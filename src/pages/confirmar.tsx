import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../../config/clienteAxios';

interface AlertaProps {
  msg?: string;
  error: boolean;
}

const Confirmar = () => {
  const params = useParams();
  const { token } = params; // El token podría ser opcional
  const [usuarioConfirmado, setUsuarioConfirmado] = useState(false);
  const [alerta, setAlerta] = useState<AlertaProps>({ error: false });

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/propietario/confirmar/${token}`;
        const { data } = await clienteAxios(url);
        setAlerta({
          msg: data.message,
          error: false
        });
        setUsuarioConfirmado(true);
      } catch (error: any) {
        console.error("Error al confirmar cuenta:", error);
        setAlerta({
          msg: error.response?.data?.msg || 'Hubo un error al confirmar la cuenta',
          error: true
        });
      }
    };
    if (token) {
      confirmarCuenta();
    }
  }, [token]);

  const { msg, error } = alerta;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-gray-800 font-black text-4xl text-center mb-6">Confirma tu cuenta</h1>

        {msg && (
          <p className={`text-center mb-4 ${error ? 'text-red-500' : 'text-green-500'}`}>
            {msg}
          </p>
        )}

        {usuarioConfirmado && (
          <Link to="/login" className="block text-center my-2 font-bold text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        )}
      </div>
    </div>
  );
};

export default Confirmar;
