import { useContext } from "react";
import AppHeader from "../../components/AppHeader";
import CardClase from "../../components/CardClase";
import { NavDocenteContext } from "./RootDocente";
import { useEffect } from "react";

/**
 * Página mostrada por la ruta /docente/
 * Contiene las cards de clases del docente
 */
function HomeDocente() {
  // Guardar contexto de la navegación actual
  const { navSetter } = useContext(NavDocenteContext);
  useEffect(() => {
    navSetter((prev) => ({
      Clases: { ruta: "/docente", activo: true },
      "Nueva Clase": { ruta: prev["Nueva Clase"].ruta, activo: false },
      Ajustes: { ruta: prev["Ajustes"].ruta, activo: false },
    }));
  });

  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Tus Clases" color="amarillo" />
      <CardClase
        id="1"
        nombre="Algebra Lineal"
        horario={["Martes: 7:00 am a 10:00 am", "Viernes: 12:00 pm a 2:00 pm"]}
        color="amarillo"
      />
      <CardClase
        id="2"
        nombre="Algebra Lineal"
        horario={["Martes: 7:00 am a 10:00 am", "Viernes: 12:00 pm a 2:00 pm"]}
        color="azul"
      />
      <CardClase
        id="3"
        nombre="Algebra Lineal"
        horario={["Martes: 7:00 am a 10:00 am", "Viernes: 12:00 pm a 2:00 pm"]}
        color="verde"
      />
    </div>
  );
}

export default HomeDocente;
