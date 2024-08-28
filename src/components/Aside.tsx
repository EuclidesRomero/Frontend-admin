import { Link } from "react-router-dom"
const Aside = () => {
  return (
    <div>
      <aside className='w-[300px] h-[800px]'>
        <div className="">
          <p>Menu de administracion</p>
        </div>
        <div className="flex flex-col h-[772px]">
          <ul className="flex flex-col justify-evenly items-center ">
            <li><Link to='perfil'>Profile</Link></li>
            <li><Link to='clientes'>Clientes</Link></li>
            <li><Link to='deudores'>Deudores</Link></li>
            <li><Link to='pedidos'>Pedidos </Link></li>
            <li><Link to='sms-to-deudores'>Envia sms a tus deudores</Link></li>
            <li><Link to='/logOut'>Salir</Link></li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Aside
