import PropTypes from "prop-types";
import { BORDES } from "../constants/colores";
import Boton from "./Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

function CardClase({
  idDocente,
  idClase,
  nombreMateria,
  nombreDocente,
  color,
}) {
  const classNames =
    "text-center flex flex-col gap-4 rounded-xl mx-6 py-3 px-2 border-4 shadow-lg " +
    BORDES[color];
  return (
    <div className={classNames}>
      <div>
        <p className=" text-lg font-semibold">{nombreMateria}</p>
      </div>
      <div>
        <p className="text-sm text-zinc-600">Docente: {nombreDocente}</p>
      </div>
      <div className="flex flex-row justify-center">
        <Link to={`/admin/clases/${idDocente}/${idClase}`}>
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
  idDocente: PropTypes.string.isRequired,
  idClase: PropTypes.string.isRequired,
  nombreMateria: PropTypes.string.isRequired,
  nombreDocente: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["amarillo", "azul", "verde", "gris"]),
};

export default CardClase;
