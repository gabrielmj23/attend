import PropTypes from "prop-types";

function BotonAsistencia({ id, asistencia, cambiarAsistencia }) {
  return (
    <button
      className="pt-1 hover:scale-105"
      type="button"
      onClick={() => {
        cambiarAsistencia(id);
      }}
    >
      <img
        width="28"
        height="28"
        src={asistencia[id].asistente ? "/asistente.png" : "/inasistente.png"}
        alt={asistencia[id].asistente ? "Asistente" : "Inasistente"}
      ></img>
    </button>
  );
}

BotonAsistencia.propTypes = {
  id: PropTypes.number.isRequired,
  asistencia: PropTypes.arrayOf(PropTypes.object).isRequired,
  cambiarAsistencia: PropTypes.func.isRequired,
};

export default BotonAsistencia;
