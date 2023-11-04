import PropTypes from "prop-types";
import { useState } from "react";

function BotonAsistencia({ id, cambiarAsistencia }) {
  const [asistente, setAsistente] = useState(false);
  return (
    <button
      className="pt-1 hover:scale-105"
      type="button"
      onClick={() => {
        cambiarAsistencia(id);
        setAsistente(!asistente);
      }}
    >
      <img
        width="28"
        height="28"
        src={asistente ? "/asistente.png" : "/inasistente.png"}
        alt={asistente ? "Asistente" : "Inasistente"}
      ></img>
    </button>
  );
}

BotonAsistencia.propTypes = {
  id: PropTypes.number.isRequired,
  asistente: PropTypes.bool.isRequired,
  cambiarAsistencia: PropTypes.func.isRequired,
};

export default BotonAsistencia;
