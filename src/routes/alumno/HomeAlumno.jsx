import { useContext } from "react";
import AppHeader from "../../components/AppHeader";
import CardClase from "../../components/CardClase";
import { AlumnoContext } from "./RootAlumno";
import { useEffect } from "react";

const COLORES = ["amarillo", "azul", "verde"];

/**
 * Página mostrada por la ruta /alumno/
 * Contiene las cards de clases del alumno
 */
function HomeAlumno() {
  // Guardar contexto de la navegación actual
  const { user, navSetter } = useContext(AlumnoContext);
  useEffect(() => {
    navSetter({ type: "Clases", ruta: "/alumno/home" });
  }, [navSetter]);

  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Tus Clases" color="azul" />
      {user.user.resumen_clases?.length === 0 ? (
        <div>
          <p className="text-center">No tiene clases registradas</p>
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

export default HomeAlumno;
