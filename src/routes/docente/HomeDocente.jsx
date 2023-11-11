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
    <div className="flex flex-col gap-4 overflow-y-auto pb-36">
      <AppHeader titulo="Tus Clases" color="amarillo" />
      {user.user.resumen_clases?.length === 0 ? (
        <div>
          <p className="text-center">No tiene clases registradas</p>
          <p className="pt-3 text-center font-semibold">
            <Link to="/docente/clases/nueva" className="underline">
              Agrega una nueva
            </Link>
          </p>
        </div>
      ) : (
        user.user.resumen_clases.map((clase, index) => (
          <CardClase
            id={clase.uid}
            key={clase.uid}
            nombre={clase.nombre}
            horario={clase.horario.map(
              (horario) =>
                `${horario.dia}: ${horario.horaInicio} - ${horario.horaFin}`,
            )}
            color={COLORES[index % COLORES.length]}
          />
        ))
      )}
    </div>
  );
}

export default HomeDocente;
