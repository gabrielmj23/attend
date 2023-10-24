import { useContext } from "react";
import AppHeader from "../../components/AppHeader";
import { NavDocenteContext } from "./RootDocente";
import { useEffect } from "react";

function Clase() {
  // Guardar contexto de la navegación actual
  const { navSetter } = useContext(NavDocenteContext);
  useEffect(() => {
    navSetter({ type: "Clases", ruta: "/docente/clases/1" });
  }, [navSetter]);

  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Tus Clases" color="amarillo" />
    </div>
  );
}

export default Clase;
