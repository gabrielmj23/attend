import PropTypes from "prop-types";
import { BORDES } from "../constants/colores";
import Boton from "./Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

function CardClase({ id, nombre, horario, color }) {
  const classNames =
    "flex flex-col gap-4 rounded-xl mx-6 py-3 px-2 border-4 shadow-lg " +
    BORDES[color];
  return (
    <div className={classNames}>
      <div>
        <p className="text-lg font-semibold">{nombre}</p>
        {horario.map((hora, index) => (
          <p key={index} className="text-sm text-zinc-600">
            {hora}
          </p>
        ))}
      </div>
      <div className="flex flex-row justify-center">
        <Link to={`/docente/clases/${id}`}>
          <Boton
            texto="Ver clase"
            icono={<ArrowForwardIcon />}
            tipo="primario"
            color={color}
          />
        </Link>
      </div>
    </div>
  );
}

CardClase.propTypes = {
  id: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  horario: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.oneOf(["amarillo", "azul", "verde", "gris"]),
};

export default CardClase;
