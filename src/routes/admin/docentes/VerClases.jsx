import WebNav from "../../../components/WebNav";
import { Link } from "react-router-dom";
import AppHeader from "../../../components/AppHeader";
import CardClase from "../../../components/CardMateriaWeb";
import {
  obtenerClasesDeDocente,
  obtenerDocente,
  obtenerIDPeriodoActivo,
} from "../../../api/docente";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";

function VerClases() {
  const { idDocente } = useParams();

  const docenteQuery = useQuery({
    queryKey: ["obtenerDocente1"],
    queryFn: () => obtenerDocente({ idDocente }),
  });

  const clasesQuery = useQuery({
    queryKey: ["obtenerClases1"],
    queryFn: () => obtenerClasesDeDocente({ idDocente }),
  });

  const idActivoQuery = useQuery({
    queryKey: ["obtenerPeriodo1"],
    queryFn: () => obtenerIDPeriodoActivo(),
  });

  return (
    <div>
      <WebNav>
        <Link
          to="/admin/home"
          className="text-neutral-800 hover:text-neutral-900 hover:underline"
        >
          Periodos
        </Link>
        <Link
          to="/admin/docentes"
          className="font-bold hover:text-neutral-900 hover:underline"
        >
          Docentes
        </Link>
      </WebNav>

      {docenteQuery.isPending ||
      clasesQuery.isPending ||
      idActivoQuery.isPending ? (
        <p className="pt-10 text-center">
          <Spinner color="success" /> Cargando...
        </p>
      ) : (
        <div>
          <AppHeader
            titulo={"Docente: " + docenteQuery.data.nombre}
            color="blanco"
          />
          {clasesQuery.data.length === 0 ? (
            <p className="text-center font-semibold">
              Este profesor no tiene clases registradas
            </p>
          ) : (
            <div>
              <div className="p-10 text-center text-xl font-bold">
                Materias Activas
              </div>
              <div className="flex flex-row justify-center">
                {clasesQuery.data.map((clase) => {
                  console.log(clase.nombre);
                  if (clase.idPeriodo == idActivoQuery.data) {
                    return (
                      <div key={clase.id}>
                        <CardClase
                          idDocente={idDocente}
                          idClase={clase.id}
                          nombreMateria={clase.nombre}
                          nombreDocente={docenteQuery.data.nombre}
                          color="verde"
                        />
                      </div>
                    );
                  }
                })}
              </div>

              <div className="p-10 text-center text-xl font-bold">
                Materias Inactivas
              </div>
              <div className="flex flex-row justify-center">
                {clasesQuery.data.map((clase) => {
                  if (clase.idPeriodo != idActivoQuery.data) {
                    return (
                      <div key={clase.id}>
                        <CardClase
                          idDocente={idDocente}
                          idClase={clase.id}
                          nombreMateria={clase.nombre}
                          nombreDocente={docenteQuery.data.nombre}
                          color="gris"
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default VerClases;
