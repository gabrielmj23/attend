import { Link } from "react-router-dom";
import { useState } from "react";
import WebNav from "../../components/WebNav";
import Boton from "../../components/Boton";
import CardPeriodo from "../../components/CardPeriodo";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { obtenerPeriodos } from "../../api/admin";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


function HomeAdmin() {
  const [periodoExistente, setPeriodoExistente] = useState(false); // Inicialmente, no hay periodo
  
  // Obtener informacion de los periodos
  const { isPending, data } = useQuery({
    queryKey: ["obtenerPeriodos"],
    queryFn: () => obtenerPeriodos(),
  });

  const D = new Date(); // Fecha actual
  let periodoActual; // Periodo actual

  function obtenerPeridoActual() {
    return data.find((periodo) => periodo.fechaInicio.toDate()<=D && periodo.fechaFin.toDate()>=D); // Busca el periodo actual
  }

  isPending ? (console.log("no")) : (periodoActual = obtenerPeridoActual());
  useEffect(() => {
      if (periodoActual === undefined) {
        console.log("si");
        setPeriodoExistente(false);
      } else {
        setPeriodoExistente(true);
      }
  }, [periodoActual]);

  return (
    <div>
      <WebNav>
        <Link to="/admin/home" className="hover:underline font-semibold">Periodos</Link>
        <Link to="/admin/docentes" className="text-neutral-800 hover:text-neutral-900 hover:underline">
          Docentes
        </Link>
      </WebNav>
      <h2 className="py-8 ps-16 text-2xl pl- font-semibold">Periodo Academico Actual</h2>      
      <div className="flex flex-col items-center justify-center">

        {periodoExistente ? (
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
            <h1 className="text-2x">
              No hay periodo academico activo
            </h1>
            <Link to="/admin/periodos/nuevo" className="flex flex-col hover:underline items-center justify-center">
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
      <h2 className="py-8 ps-16 text-2xl font-semibold">Periodos anteriores</h2>
      <div className="flex flex-col items-center justify-center place-self-center">          
        {isPending ? (
          <p>Cargando periodos</p>
        ) : (
        data.map((periodo) => (
          <div className="m-2 w-3/4"> {/* Agrega un margen a cada tarjeta */}
            
            <CardPeriodo
              idPeriodo={periodo.id}
              nombre={periodo.nombre}
              inicio={periodo.fechaInicio.toDate()}
              fin={periodo.fechaFin.toDate()}
              duracion={periodo.duracion}
              color="gris"
            />
            
          </div>
        )))}
      </div>
    </div>
  );
}

export default HomeAdmin;