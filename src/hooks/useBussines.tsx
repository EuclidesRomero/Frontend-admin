import { useContext } from "react";
import NegocioContext from "../context/NegociosProvider";

const useBussines = () => {
    const context = useContext(NegocioContext)
    if  (context === undefined) {
        throw new Error("useBussines debe ser usado dentro de un BussinesProvider");
      }
      return context;
}

export default useBussines;