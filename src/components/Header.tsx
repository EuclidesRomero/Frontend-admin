import { Link } from "react-router-dom";
import '../App.css';
import { MenuIcon, CloseIcon } from "./Icons.tsx";
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex ">
        <div className="ml-10 w-2/6">
          <div className="size-20 ">
            <Link to="/">
              <img src="/img/admin.png" alt="Logo" />
            </Link>
          </div>
        </div>
        <div className="hidden md:flex md:w-2/4  justify-end " style={{ fontFamily: "'Roboto Serif', serif" }}>
          <nav className="flex flex-row justify-evenly mr-5 -mt-4">
            <ul className="flex gap-10 mt-4">
              <li className="text-1xl font-semibold poppins-light"><Link to="/">Inicio</Link></li>
              <li className="text-1xl font-semibold poppins-light"><Link to="/about">About</Link></li>
              <li className="text-1xl font-semibold poppins-light"><Link to="/contacto">Contacto</Link></li>
              <li className="text-1xl font-semibold poppins-light"><Link to="/login">Login</Link></li>
              <li className="text-1xl font-semibold poppins-light"><Link to="/register">Registro</Link></li>
            </ul>
          </nav>
        </div>
        <div className="md:hidden flex items-center mr-10">
          <button onClick={toggleMenu}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden text-black">
          <ul className="flex flex-col items-center gap-4 p-4">
            <li className="text-1xl font-bold"><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
            <li className="text-1xl font-bold"><Link to="/about" onClick={toggleMenu}>About</Link></li>
            <li className="text-1xl font-bold"><Link to="/contacto" onClick={toggleMenu}>Contacto</Link></li>
            <li className="text-1xl font-bold"><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
