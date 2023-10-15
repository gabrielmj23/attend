import PropTypes from "prop-types";
import { BOTONES_PRIMARIO } from "../constants/colores";

function Boton({ texto, icono, tipo, color, sombra, onClick, textSize }) {
  let classNames =
    "flex flex-row gap-2 rounded-md p-2 font-semibold hover:scale-105 active:scale-105 ";
  if (sombra) {
    classNames += " shadow-md";
  }
  if (tipo === "primario") {
    classNames += BOTONES_PRIMARIO[color];
  } else {
    classNames += " border-[#8c7027] border-[3px] text-[#8c7027] bg-slate-200";
  }
  return (
    <button className={classNames} onClick={onClick}>
      <span className={textSize ? textSize : "text-sm"}>
        {texto} {icono}
      </span>
    </button>
  );
}

Boton.propTypes = {
  texto: PropTypes.string.isRequired,
  icono: PropTypes.element.isRequired,
  tipo: PropTypes.oneOf(["primario", "secundario"]).isRequired,
  color: PropTypes.oneOf(["amarillo", "azul", "verde", "gris"]).isRequired,
  sombra: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  textSize: PropTypes.oneOf(["text-sm", "text-xs"]),
};

export default Boton;
