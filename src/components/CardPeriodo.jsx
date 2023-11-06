import PropTypes from "prop-types";
import { BORDES } from "../constants/colores";
import Boton from "./Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function CardPeriodo({ idPeriodo, inicio, fin, duracion, color }) {
  const classNames =
    "grid grid-cols-2 gap-4 rounded-xl mx-6 py-3 px-4 border-4 shadow-lg items-center " +
    BORDES[color];
  return (
    <div className={classNames}>
      <div>
        <p className="text-lg font-semibold">Periodo {idPeriodo}</p>
        <div className="px-2 text-sm text-zinc-600">
          <p>Inicio: {inicio}</p>
          <p>Fin: {fin}</p>
          <p>Duracion: {duracion} semanas</p>
        </div>
      </div>

      <div>
        <Boton
          texto="Ver periodo"
          icono={<ArrowForwardIcon />}
          tipo="primario"
          color={color}
        />
      </div>
    </div>
  );
}

CardPeriodo.propTypes = {
  idPeriodo: PropTypes.string.isRequired,
  inicio: PropTypes.string.isRequired,
  fin: PropTypes.string.isRequired,
  duracion: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["verde", "gris"]),
};

export default CardPeriodo;
