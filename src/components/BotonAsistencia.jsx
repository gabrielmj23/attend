import PropTypes from "prop-types";

function BotonAsistencia({
  id,
  asistencia,
  asistenciaManual,
  cambiarAsistencia,
  disabled = false,
}) {
  return (
    <button
      className="pt-1 hover:scale-105"
      type="button"
      disabled={disabled}
      onClick={() => {
        if (!disabled) cambiarAsistencia(id);
      }}
    >
      <img
        width="28"
        height="28"
        src={
          asistencia[id].asistente
            ? asistenciaManual && asistenciaManual[id]
              ? "/asistenteManual.png"
              : "/asistente.png"
            : "/inasistente.png"
        }
        alt={asistencia[id].asistente ? "Asistente" : "Inasistente"}
      ></img>
    </button>
  );
}

BotonAsistencia.propTypes = {
  id: PropTypes.number,
  asistencia: PropTypes.arrayOf(PropTypes.object).isRequired,
  cambiarAsistencia: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BotonAsistencia;
