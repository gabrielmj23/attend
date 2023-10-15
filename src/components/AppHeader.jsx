import PropTypes from "prop-types";
import { APP_HEADER } from "../constants/colores";

function AppHeader({ titulo, color }) {
  const className = "pt-10 pb-3 ps-4 " + APP_HEADER[color];
  return (
    <header className={className}>
      <h1 className="text-3xl font-bold">{titulo}</h1>
    </header>
  );
}

AppHeader.propTypes = {
  titulo: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["amarillo", "azul"]).isRequired,
};

export default AppHeader;
