import WebNav from "../../../components/WebNav";
import { Link } from "react-router-dom";
import AppHeader from "../../../components/AppHeader";
import CardClase from "../../../components/CardMateriaWeb";
import {
  obtenerClases,
  obtenerDocente,
  obtenerIDPeriodoActivo,
} from "../../../api/docente";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function VerClases() {
  const { idDocente } = useParams();

  const docenteQuery = useQuery({
    queryKey: ["obtenerDocente1"],
    queryFn: () => obtenerDocente({ idDocente }),
  });

  const clasesQuery = useQuery({
    queryKey: ["obtenerClases1"],
    queryFn: () => obtenerClases({ idDocente }),
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
        <p>Cargando...</p>
      ) : (
        <div>
          <AppHeader
            titulo={"Docente: " + docenteQuery.data.nombre}
            color="blanco"
          />
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
                        seccion="REVISAR DB"
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
                console.log(clase.nombre);
                if (clase.idPeriodo != idActivoQuery.data) {
                  return (
                    <div key={clase.id}>
                      {console.log("ID DOCENTE: ", clase.id)}
                      <CardClase
                        idDocente={idDocente}
                        idClase={clase.id}
                        nombreMateria={clase.nombre}
                        nombreDocente={docenteQuery.data.nombre}
                        seccion="REVISAR DB"
                        color="gris"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default VerClases;
