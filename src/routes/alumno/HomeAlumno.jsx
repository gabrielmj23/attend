import { useContext } from "react";
import AppHeader from "../../components/AppHeader";
import CardClase from "../../components/CardClase";
import { AlumnoContext } from "./RootAlumno";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const COLORES = ["amarillo", "azul", "verde"];

/**
 * Página mostrada por la ruta /alumno/
 * Contiene las cards de clases del alumno
 */
function HomeAlumno() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  if (!user) {
    navigate("/alumno/login");
  }
  // Guardar contexto de la navegación actual
  const { navSetter } = useContext(AlumnoContext);
  useEffect(() => {
    navSetter({ type: "Clases", ruta: "/alumno/home" });
  }, [navSetter]);

  return (
    <div className="flex flex-col gap-4 overflow-y-auto pb-36">
      <AppHeader titulo="Tus Clases" color="azul" />
      {user.resumen_clases?.length === 0 ? (
        <div>
          <p className="text-center">No tiene clases registradas</p>
        </div>
      ) : (
        user.resumen_clases.map((clase, index) => (
          <CardClase
            id={clase.uid}
            key={clase.uid}
            nombre={clase.nombre}
            inasistencias={clase.inasistencias}
            totalClases={clase.totalClases}
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
