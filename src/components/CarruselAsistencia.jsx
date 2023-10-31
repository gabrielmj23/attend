import PropTypes from "prop-types";
import CardAsistencia from "./CardAsistencia";

function CarruselAsistencia({ plan }) {
  return (
    <div className="flex flex-nowrap gap-6 overflow-x-auto px-4">
      {plan.map((asistencia, index) => (
        <CardAsistencia
          key={index}
          fecha={asistencia.fecha.toDate()}
          contenido={asistencia.tema}
          color="amarillo"
        />
      ))}
    </div>
  );
}

CarruselAsistencia.propTypes = {
  plan: PropTypes.array.isRequired,
};

export default CarruselAsistencia;
