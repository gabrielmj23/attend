import { Link } from "react-router-dom";
import Boton from "./components/Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Landing() {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row">
      <div className="flex h-full w-full flex-col justify-center bg-gradient-to-br from-degradado to-degradado2 px-16 py-16 align-middle md:p-0">
        <div className="mx-auto mb-2 flex flex-row gap-2 rounded-xl bg-zinc-200 bg-opacity-50 p-3">
          <img
            className="pb-2 md:h-40 md:w-40"
            src="/logo.png"
            alt="Logo de Attend"
            width="88"
            height="88"
          ></img>
          <img
            className="pb-2 md:h-40 md:w-40"
            src="/LogoUCAB.png"
            alt="Logo de la UCAB"
            width="88"
            height="88"
          ></img>
        </div>
        <h1 className="text-center text-4xl font-bold">Attend</h1>
        <p className="text-center text-xl">
          La asistencia, <strong>reinventada</strong>
        </p>
        <p className="pb-3 pt-6 md:px-4">
          Con Attend, buscamos crear un nuevo modelo para el control de
          asistencias en la universidad, logrando:
        </p>
        <ul className="px-2 md:px-8">
          <li>- Disminuir el uso de papel</li>
          <li>- Agilizar la toma de asistencia</li>
          <li>- Facilitar los procesos administrativos</li>
        </ul>
      </div>

      <div className="flex h-full w-full flex-col">
        <div className="flex grow flex-col items-center justify-center gap-2 bg-amarillo p-8 align-middle md:p-0">
          <h2 className="text-center text-2xl font-bold">Soy docente</h2>
          <p className="text-center">
            Toma la asistencia de manera rápida y eficiente, con solo tu
            teléfono
          </p>
          <Link to="/docente/login">
            <Boton
              color="blanco"
              sombra={true}
              texto="Ingresar"
              icono={<ArrowForwardIcon />}
            />
          </Link>
        </div>

        <div className="flex grow flex-col items-center justify-center gap-2 bg-azul p-8 align-middle md:p-0">
          <h2 className="text-center text-2xl font-bold">Soy alumno</h2>
          <p className="text-center">
            Haz un seguimiento de tu asistencia a clases
          </p>
          <Link to="/alumno/login">
            <Boton
              color="blanco"
              sombra={true}
              texto="Ingresar"
              icono={<ArrowForwardIcon />}
            />
          </Link>
        </div>

        <div className="flex grow flex-col items-center justify-center gap-2 bg-verde p-8 align-middle md:p-0">
          <h2 className="text-center text-2xl font-bold">
            Soy administrador/director de escuela
          </h2>
          <p className="text-center">
            Gestiona docentes, períodos académicos y crea registros sobre las
            asistencias
          </p>
          <Link to="/admin/login">
            <Boton
              color="blanco"
              sombra={true}
              texto="Ingresar"
              icono={<ArrowForwardIcon />}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
