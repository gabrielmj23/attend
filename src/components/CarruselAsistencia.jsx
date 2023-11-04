import PropTypes from "prop-types";
import CardAsistencia from "./CardAsistencia";

function CarruselAsistencia({ idClase, plan }) {
  return (
    <div className="flex flex-nowrap gap-6 overflow-x-auto px-4">
      {plan.map((asistencia, index) => (
        <CardAsistencia
          key={index}
          idClase={idClase}
          fecha={asistencia.fecha.toDate()}
          contenido={asistencia.tema}
          color="amarillo"
        />
      ))}
    </div>
  );
}

CarruselAsistencia.propTypes = {
  idClase: PropTypes.string.isRequired,
  plan: PropTypes.array.isRequired,
};

export default CarruselAsistencia;
