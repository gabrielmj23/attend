import { useContext } from "react";
import AppHeader from "../../components/AppHeader";
import CardClase from "../../components/CardClase";
import { DocenteContext } from "./RootDocente";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const COLORES = ["amarillo", "azul", "verde"];

/**
 * Página mostrada por la ruta /docente/
 * Contiene las cards de clases del docente
 */
function HomeDocente() {
  // Guardar contexto de la navegación actual
  const { user, navSetter } = useContext(DocenteContext);
  useEffect(() => {
    navSetter({ type: "Clases", ruta: "/docente/home" });
  }, [navSetter]);

  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Tus Clases" color="amarillo" />
      {user.user.resumen_clases?.length === 0 ? (
        <div>
          <p className="text-center">No tiene clases registradas</p>
          <Link to="/docente/nueva-clase" className="text-center underline">
            Agrega una nueva
          </Link>
        </div>
      ) : (
        user.user.resumen_clases.map((clase, index) => (
          <CardClase
            id={clase.uid}
            key={clase.uid}
            nombre={clase.nombre}
            horario={clase.horario}
            color={COLORES[index % COLORES.length]}
          />
        ))
      )}
    </div>
  );
}

export default HomeDocente;
