import Header from "./Header"
const Home = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="w-[1000px] h-[600px]  flex justify-center items-center gap-5">
          <div className="w-[500px] border-2 mr-2 mb-2 border-gray-400 rounded-xl shadow-md h-[450px] ">
            <h1 className="poppins-light text-4xl mb-5">
              Welcome to <span className="font-semibold">Tu Admin</span>{" "}
            </h1>
            <div className="justify-start">
            <p className="poppins-light text-2xl">
              Simplifique la <span className="bg-yellow-200 rounded-lg border-2 border-black">administración</span> financiera de su negocio con nuestra
              <span className="bg-yellow-200 border-2 rounded-lg border-black ">App</span>
            </p>
            </div>
            <div className="h-[90px] flex justify-center items-center gap-4 mt-10">
              <button className="block bg-black w-32 h-14 rounded-lg text-white">GET STARTED</button>
              <button className="block bg-black w-32 h-14 rounded-lg text-white">CONTACT US</button>
            </div>
            <div className=" h-80 flex justify-center">
              <p className="poppins-light text-2xl">
                Aproveche nuestras herramientas para simplificar su
                administración y concentrarse en lo que realmente importa: hacer
                <span className="bg-yellow-200 rounded-lg border-2 border-black">crecer</span> su negocio.
              </p>
            </div>
          </div>
          <div className="w-[500px]">
            <img src="/img/homeImg.jpg"  className="xl:h-[593px] xl:w-[500px]  object-cover rounded-lg" />
          </div>
        </div>
      </div>
      <p className="font-semibold text-2xl mt-2 mb-2">Nuestros servicios</p>
      <div className="flex justify-center">
        <footer className="w-[1000px] h-20">
          <div className="flex gap-1">
            <div className=" border-2 rounded-lg w-[333.1px] h-20  flex items-center gap-5 font-bold"><div><img src="/img/whatsapp-icon.png" alt="" className="w-20 h-20" /></div>Controla pedidos</div>
            <div className=" border-2 rounded-lg w-[333.1px] h-20  flex items-center gap-5  font-bold"><div><img src="/img/contabilidad.png" alt="" className="w-20 h-20" /></div>Control de créditos</div>
            <div className=" border-2 rounded-lg w-[333.1px] h-20  flex items-center gap-5  font-bold"><div><img src="/img/sms-de-telefono.png" alt="" className="w-20 h-20" /></div>Envía sms a tus clientes</div>
           
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
