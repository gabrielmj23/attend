import PropTypes from "prop-types";
import { BORDES } from "../constants/colores";
import Boton from "./Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

function CardPeriodo({ idPeriodo, nombre, inicio, fin, duracion, color }) {
  const classNames =
    "grid grid-cols-2 gap-4 rounded-xl mx-6 py-3 px-4 border-4 shadow-lg items-center " +
    BORDES[color];
  return (
    <div className={classNames}>
      <div>
        <p className="text-lg font-semibold">Periodo {nombre}</p>
        <div className="px-2 text-sm text-zinc-600">
          <p>Inicio: {inicio.toLocaleDateString()}</p>
          <p>Fin: {fin.toLocaleDateString()}</p>
          <p>Duracion: {duracion} semanas</p>
        </div>
      </div>

      <div>
        <Link
          to={`/admin/periodos/${idPeriodo}`}
          className="flex flex-col items-center justify-center hover:underline"
        >
          <Boton
            texto="Ver periodo"
            icono={<ArrowForwardIcon />}
            tipo="primario"
            color={color}
          />
        </Link>
      </div>
    </div>
  );
}

CardPeriodo.propTypes = {
  idPeriodo: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  inicio: PropTypes.string.isRequired,
  fin: PropTypes.string.isRequired,
  duracion: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["verde", "gris"]),
};

export default CardPeriodo;
