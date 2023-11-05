import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavElem({ icono, label, ruta, activo }) {
  return (
    <Link
      to={ruta}
      className={
        "flex flex-col items-center gap-1 rounded-xl p-2 active:bg-zinc-200 " +
        (activo ? "text-amarillo-activo" : "text-zinc-950")
      }
    >
      {activo ? (
        <div className="bg-amarillo-activo h-1 w-full rounded-full"></div>
      ) : (
        <div className="display-none h-1 rounded-full"></div>
      )}
      {icono}
      <p className="text-xs">{label}</p>
    </Link>
  );
}

NavElem.propTypes = {
  icono: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  ruta: PropTypes.string.isRequired,
  activo: PropTypes.bool,
};

export default NavElem;
