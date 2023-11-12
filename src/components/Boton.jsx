import PropTypes from "prop-types";
import { BOTONES_PRIMARIO, BOTONES_SECUNDARIO } from "../constants/colores";

function Boton({
  texto,
  icono,
  tipo = "primario",
  color,
  sombra,
  type,
  onClick,
  textSize,
  disabled,
}) {
  let classNames =
    "flex flex-row gap-2 rounded-md p-2 font-semibold hover:scale-105 active:scale-105 w-fit ";
  if (sombra) {
    classNames += " shadow-md ";
  }
  if (tipo === "primario") {
    if (disabled) {
      classNames += BOTONES_PRIMARIO["gris"];
    } else {
      classNames += BOTONES_PRIMARIO[color];
    }
  } else {
    classNames += BOTONES_SECUNDARIO[color];
  }
  return (
    <button
      className={classNames}
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={textSize ? textSize : "text-sm"}>
        {texto} {icono}
      </span>
    </button>
  );
}

Boton.propTypes = {
  texto: PropTypes.string.isRequired,
  icono: PropTypes.element.isRequired,
  tipo: PropTypes.oneOf(["primario", "secundario"]),
  color: PropTypes.oneOf(["amarillo", "azul", "verde", "gris", "blanco"]),
  sombra: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit"]),
  onClick: PropTypes.func,
  textSize: PropTypes.oneOf(["text-sm", "text-xs"]),
  disabled: PropTypes.bool,
};

export default Boton;
