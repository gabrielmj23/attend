import PropTypes from "prop-types";
import CardAsistencia from "./CardAsistencia";
import { useRef } from "react";
import { useEffect } from "react";

/**
 *
 * @param {Date} fecha
 * @param {Date} fechaCercana
 */
function esCardActual(fecha, fechaCercana) {
  return (
    fecha.getDate() === fechaCercana.getDate() &&
    fecha.getMonth() === fechaCercana.getMonth() &&
    fecha.getYear() === fechaCercana.getYear()
  );
}

function CarruselAsistencia({ idClase, plan, color }) {
  const actualRef = useRef();
  const hoy = new Date();
  const fechaCercana = plan.reduce((prev, curr) => {
    return prev.fecha.toDate() - hoy > curr.fecha.toDate() - hoy ? prev : curr;
  });
  useEffect(() => {
    if (actualRef.current) {
      actualRef.current.scrollIntoView({
        block: "end",
        inline: "center",
        behavior: "smooth",
      });
    }
  }, [actualRef]);
  return (
    <div className="flex flex-nowrap gap-6 overflow-x-auto px-4">
      {plan.map((asistencia, index) => (
        <CardAsistencia
          key={index}
          idClase={idClase}
          fecha={asistencia.fecha.toDate()}
          contenido={asistencia.tema}
          color={color}
          refProps={
            esCardActual(asistencia.fecha.toDate(), fechaCercana.fecha.toDate())
              ? actualRef
              : null
          }
        />
      ))}
    </div>
  );
}

CarruselAsistencia.propTypes = {
  idClase: PropTypes.string.isRequired,
  plan: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
};

export default CarruselAsistencia;
