import { PropTypes } from "prop-types";
import { BORDES } from "../constants/colores";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import Boton from "./Boton";
import { Link } from "react-router-dom";

function CardAsistencia({ idClase, fecha, contenido, color }) {
  let classNames =
    "flex flex-col justify-center gap-4 rounded-xl min-w-[150px] h-44 py-3 px-2 border-4 shadow-xl " +
    BORDES[color];

  let fechaActual = new Date();
  const iconos = [
    <AccessTimeIcon key="1" />,
    <InventoryOutlinedIcon key="2" />,
  ];
  let boton = null;
  const urlAsistencia = `/docente/clases/${idClase}/${
    fecha.getMonth() + 1
  }-${fecha.getDate()}-${fecha.getYear() % 100}`;

  if (
    fecha.getDate() === fechaActual.getDate() &&
    fecha.getMonth() === fechaActual.getMonth() &&
    fecha.getYear() === fechaActual.getYear()
  ) {
    boton = (
      <Link to={urlAsistencia}>
        <Boton
          texto="Tomar asistencia"
          icono={iconos[1]}
          tipo="primario"
          color={color}
          textSize="text-xs"
        />
      </Link>
    );
  } else if (fechaActual > fecha) {
    boton = (
      <Link to={urlAsistencia}>
        <Boton
          texto="Ver asistencia"
          icono={iconos[0]}
          tipo="secundario"
          color={color}
          textSize="text-xs"
        />
      </Link>
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
  idClase: PropTypes.string.isRequired,
  fecha: PropTypes.instanceOf(Date).isRequired,
  contenido: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["amarillo", "azul", "verde", "gris"]).isRequired,
};

export default CardAsistencia;
