import { PropTypes } from "prop-types";
import { BORDES } from "../constants/colores";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import Boton from "./Boton";

function CardAsistencia({ fecha, contenido, color }) {
  let classNames =
    "flex flex-col justify-center gap-4 rounded-xl w-1/2 h-44 mx-6 py-3 px-2 border-4 shadow-lg " +
    BORDES[color];

  let fechaActual = new Date();
  const iconos = [
    <AccessTimeIcon key="1" />,
    <InventoryOutlinedIcon key="2" />,
  ];
  let boton = null;
  if (
    fecha.getDate() === fechaActual.getDate() &&
    fecha.getMonth() === fechaActual.getMonth() &&
    fecha.getYear() === fechaActual.getYear()
  ) {
    boton = (
      <Boton
        texto="Tomar asistencia"
        icono={iconos[1]}
        tipo="primario"
        color={color}
        textSize="text-xs"
      />
    );
  } else if (fechaActual > fecha) {
    boton = (
      <Boton
        texto="Ver asistencia"
        icono={iconos[0]}
        tipo="secundario"
        color={color}
        textSize="text-xs"
      />
    );
  }

  return (
    <div className={classNames}>
      <div className="text-center">
        <p className="text-lg font-semibold">
          {fecha.getDate() +
            "/" +
            (fecha.getMonth() + 1) +
            "/" +
            (fecha.getYear() - 100)}
        </p>
        <p className="text-sm font-semibold">{contenido}</p>
      </div>
      <div className="flex flex-row justify-center">{boton}</div>
    </div>
  );
}

CardAsistencia.propTypes = {
  fecha: PropTypes.instanceOf(Date).isRequired,
  contenido: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["amarillo", "azul", "verde", "gris"]).isRequired,
};

export default CardAsistencia;
