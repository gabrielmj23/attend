import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DocenteContext } from "../routes/docente/RootDocente";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AlumnoContext } from "../routes/alumno/RootAlumno";

function NavElem({ icono, label, ruta, activo, color = "amarillo" }) {  
  const location = useLocation();
  const docenteContext = useContext(DocenteContext);
  const alumnoContext = useContext(AlumnoContext);

  useEffect(() => {
    if (location.pathname === "/docente/home") {
      docenteContext.setColorClase("amarillo");
    } else if (location.pathname === "/alumno/home") {
      alumnoContext.setColorClase("azul");
    }
  }, [location]);

  color = docenteContext.colorClase ? docenteContext.colorClase : alumnoContext.colorClase ? alumnoContext.colorClase : color;
  if (location.pathname === "/docente/ajustes" || location.pathname === "/docente/clases/nueva") {
    color = "amarillo";    
  } else if (location.pathname === "/alumno/ajustes") {
    color = "azul";
  }

  return (
    <Link
      to={ruta}
      className={
        "flex flex-col items-center gap-1 rounded-xl p-2 active:bg-zinc-200 " +
        (activo
          ? color === "amarillo"
            ? "text-amarillo-activo"
            : color === "azul"
            ? "text-azul-activo"
            : color === "verde"
            ? "text-verde-activo"
            : color === "morado"
            ? "text-morado-activo"
            : color === "azuloscuro"
            ? "text-azuloscuro-activo"
            : "text-zinc-950"
          : "text-zinc-950")
        }
    >
      {activo ? (
        color === "amarillo" ? (
          <div className="h-1 w-full rounded-full bg-amarillo-activo"></div>
        ) : color === "azul" ? (
          <div className="h-1 w-full rounded-full bg-azul-activo"></div>
        ) : color === "verde" ? (
          <div className="h-1 w-full rounded-full bg-verde-activo"></div>
        ) : color === "morado" ? (
          <div className="h-1 w-full rounded-full bg-morado-activo"></div>
        ) : color === "azuloscuro" ? (
          <div className="h-1 w-full rounded-full bg-azuloscuro-activo"></div>
        ) : (
          <div className="display-none h-1 rounded-full"></div>
        )
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
  color: PropTypes.oneOf(["amarillo", "azul", "verde", "morado", "azuloscuro"]),
};

export default NavElem;
