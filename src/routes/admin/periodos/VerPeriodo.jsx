import { Link } from "react-router-dom";
import WebNav from "../../../components/WebNav";
import Input from "../../../components/Input";
import SearchIcon from "@mui/icons-material/Search";
import CardMateriaWeb from "../../../components/CardMateriaWeb";
import { useParams } from "react-router-dom";
import {
  obtenerClasesDeDocentes,
  obtenerIDsDocentes,
} from "../../../api/docente";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

function VerPeriodo() {
  const { idPeriodo } = useParams();
  const [docentesData, setDocentesData] = useState(null);
  const [clasesPeriodoActual, setClasesPeriodoActual] = useState(null);

  // Obtener informacion de los docentes
  const docentesQuery = useQuery({
    queryKey: ["obtenerIDsDocentes"],
    queryFn: () => obtenerIDsDocentes(),
  });

  const clasesQuery = useQuery({
    queryKey: ["obtenerClasesDeDocentes"],
    queryFn: () => obtenerClasesDeDocentes(docentesData),
    enabled: !!docentesData, // La consulta se ejecutará solo si docentesData es verdadero (no null, no undefined)
  });

  useEffect(() => {
    if (!docentesQuery.isPending) {
      setDocentesData(docentesQuery.data);
    }
  }, [docentesQuery.isPending, docentesQuery.data]);

  useEffect(() => {
    if (!clasesQuery.isPending) {
      const clasesFiltradas = clasesQuery.data.filter(
        (clase) => clase.idPeriodo === idPeriodo,
      );
      setClasesPeriodoActual(clasesFiltradas);
    }
  }, [clasesQuery.isPending, clasesQuery.data, idPeriodo]);

  return (
    <div>
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
      <h2 className="pl- py-8 ps-16 text-2xl font-semibold">Periodo: </h2>
      <div className="pl- flex w-1/2 max-w-lg flex-col gap-6 ps-16">
        <Input
          id="buscar"
          textoLabel="Buscar materia"
          textoPlaceholder="Materia"
          icono={<SearchIcon />}
        />
      </div>
      <div className="mx-10 grid grid-cols-3 items-center justify-center gap-6 place-self-center py-8">
        {clasesQuery.isPending && <p>Cargando clases...</p>}
        {clasesPeriodoActual &&
          clasesPeriodoActual.map((clase) => (
            <CardMateriaWeb
              key={clase.id}
              idClase={clase.id}
              idDocente={clase.idDocente}
              nombreMateria={clase.nombre}
              nombreDocente={clase.nombreDocente}
              color="verde"
            />
          ))}
      </div>
    </div>
  );
}

export default VerPeriodo;
