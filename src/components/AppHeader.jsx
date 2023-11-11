import PropTypes from "prop-types";
import { APP_HEADER } from "../constants/colores";
import BotonAtras from "./BotonAtras";

function AppHeader({ titulo, color, atras }) {
  const className = "pt-10 pb-3 ps-4 flex flex-row gap-2 " + APP_HEADER[color];
  return (
    <header className={className}>
      {atras && <BotonAtras path={atras} />}
      <h1 className="text-3xl font-bold">{titulo}</h1>
    </header>
  );
}

AppHeader.propTypes = {
  titulo: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["amarillo", "azul", "verde", "morado", "azuloscuro"]).isRequired,
  atras: PropTypes.string,
};

export default AppHeader;
