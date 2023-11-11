import PropTypes from "prop-types";
import { BORDES } from "../constants/colores";
import Boton from "./Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { DocenteContext } from "../routes/docente/RootDocente";
import { AlumnoContext } from "../routes/alumno/RootAlumno";
import { useEffect } from "react";

function CardClase({
  id,
  nombre,
  inasistencias = -1,
  totalClases,
  horario,
  color,
}) {
  const { setColorClase: setDocenteColorClase } = useContext(DocenteContext);
  const { setColorClase: setAlumnoColorClase } = useContext(AlumnoContext);
  const location = useLocation();

  const handleButtonClick = () => {
    if (location.pathname.startsWith("/docente")) {
      setDocenteColorClase(color);
    } else if (location.pathname.startsWith('/alumno')) {
      setAlumnoColorClase(color);
    }
  };

  const classNames =
    "flex flex-col gap-4 rounded-xl mx-6 py-3 px-2 border-4 shadow-lg " +
    BORDES[color];
  let porcentajeInasistencias = null;
  if (inasistencias > -1) {
    porcentajeInasistencias = ((inasistencias / totalClases) * 100).toFixed(2);
  }
  return (
    <div className={classNames}>
      <div>
        <p className="text-lg font-semibold">{nombre}</p>
        {porcentajeInasistencias !== null ? (
          porcentajeInasistencias >= 30 ? (
            <p className="pb-1 text-sm font-semibold text-red-700 underline">
              Tienes un {porcentajeInasistencias}% de inasistencias
            </p>
          ) : porcentajeInasistencias > 20 ? (
            <p className="pb-1 text-sm font-semibold text-amarillo-activo underline">
              Tienes un {porcentajeInasistencias}% de inasistencias
            </p>
          ) : (
            <p className="pb-1 text-sm font-semibold text-zinc-600 underline">
              Tienes un {porcentajeInasistencias}% de inasistencias
            </p>
          )
        ) : null}
        {horario.map((hora, index) => (
          <p key={index} className="text-sm text-zinc-600">
            {hora}
          </p>
        ))}
      </div>
      <div className="flex flex-row justify-center">
        <Link
          to={
            inasistencias > -1
              ? `/alumno/clases/${id}`
              : `/docente/clases/${id}`
          }
        >
          <Boton
            texto="Ver clase"
            icono={<ArrowForwardIcon />}
            tipo="primario"
            color={color}
            onClick={handleButtonClick}
          />
        </Link>
      </div>
    </div>
  );
}

CardClase.propTypes = {
  id: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  inasistencias: PropTypes.number,
  totalClases: PropTypes.number,
  horario: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.oneOf(["amarillo", "azul", "verde", "morado", "azuloscuro", "gris"]),
};

export default CardClase;
