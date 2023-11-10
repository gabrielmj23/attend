import { Link } from "react-router-dom";
import WebNav from "../../components/WebNav";
import Boton from "../../components/Boton";
import CardPeriodo from "../../components/CardPeriodo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { obtenerPeriodos } from "../../api/admin";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";

/**
 *
 * @param {Object[]} data - Lista de periodos
 */
function obtenerPeriodoActual(data) {
  const fechaActual = new Date(); // Fecha actual
  return data.find(
    (periodo) =>
      periodo.fechaInicio.toDate() <= fechaActual &&
      periodo.fechaFin.toDate() >= fechaActual,
  ); // Busca el periodo actual
}

function HomeAdmin() {
  // Obtener informacion de los periodos
  const { isPending, data } = useQuery({
    queryKey: ["obtenerTodosPeriodos"],
    queryFn: () => obtenerPeriodos(),
  });

  let periodoActual = null; // Periodo actual
  if (!isPending) {
    periodoActual = obtenerPeriodoActual(data);
  }

  return (
    <div className="pb-8">
      <WebNav>
        <Link to="/admin/home" className="font-semibold hover:underline">
          Periodos
        </Link>
        <Link
          to="/admin/docentes"
          className="text-neutral-800 hover:text-neutral-900 hover:underline"
        >
          Docentes
        </Link>
      </WebNav>
      {isPending ? (
        <span className="pt-8 text-center">
          <Spinner color="success" /> Cargando...
        </span>
      ) : (
        <div>
          <h2 className="pl- py-8 ps-16 text-2xl font-semibold">
            Período Académico Actual
          </h2>
          <div className="flex flex-col items-center justify-center">
            {periodoActual ? (
              //Si hay periodo academico activo, muestra la tarjeta
              <div className="m-2">
                <CardPeriodo
                  idPeriodo={periodoActual.id}
                  nombre={periodoActual.nombre}
                  inicio={periodoActual.fechaInicio.toDate()}
                  fin={periodoActual.fechaFin.toDate()}
                  duracion={periodoActual.duracion}
                  color="verde"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-2x">No hay periodo academico activo</h1>
                <Link
                  to="/admin/periodos/nuevo"
                  className="flex flex-col items-center justify-center hover:underline"
                >
                  <Boton
                    texto="Crear nuevo periodo"
                    color="verde"
                    tipo="primario"
                    type="button"
                    icono={<AddCircleOutlineIcon />}
                  />
                </Link>
              </div>
            )}
          </div>
          <h2 className="py-8 ps-16 text-2xl font-semibold">
            Períodos Anteriores
          </h2>
          <div className="flex flex-col items-center justify-center place-self-center">
            {isPending ? (
              <p>Cargando períodos</p>
            ) : (
              data
                .filter((periodo) => periodo !== periodoActual)
                .map((periodo, i) => (
                  <div key={i} className="m-2 w-3/4">
                    <CardPeriodo
                      idPeriodo={periodo.id}
                      nombre={periodo.nombre}
                      inicio={periodo.fechaInicio.toDate()}
                      fin={periodo.fechaFin.toDate()}
                      duracion={periodo.duracion}
                      color="gris"
                    />
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeAdmin;
