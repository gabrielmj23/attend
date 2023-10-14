import PropTypes from "prop-types";
import { COLORES } from "../constants/colores";

function Boton({ texto, icono, color, sombra, onClick }) {
  let classNames =
    "flex flex-row gap-2 rounded-md p-2 font-semibold bg-" + COLORES[color];
  if (sombra) {
    classNames += " shadow-md";
  }
  return (
    <button className={classNames} onClick={onClick}>
      {texto}
      {icono}
    </button>
  );
}

Boton.propTypes = {
  texto: PropTypes.string.isRequired,
  icono: PropTypes.element.isRequired,
  color: PropTypes.oneOf(["amarillo", "verde", "azul", "gris"]).isRequired,
  sombra: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Boton;
