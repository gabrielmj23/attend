import { useContext } from "react";
import AppHeader from "../../components/AppHeader";
import { NavDocenteContext } from "./RootDocente";
import { useEffect } from "react";

function Clase() {
  // Guardar contexto de la navegación actual
  const { navSetter } = useContext(NavDocenteContext);
  useEffect(() => {
    navSetter((prev) => ({
      Clases: { ruta: "/docente/clases/1", activo: true },
      "Nueva Clase": { ruta: prev["Nueva Clase"].ruta, activo: false },
      Ajustes: { ruta: prev["Ajustes"].ruta, activo: false },
    }));
  }, [navSetter]);

  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Tus Clases" color="amarillo" />
    </div>
  );
}

export default Clase;
