import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import WebNav from "../../../components/WebNav";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { obtenerReportesDeClase } from "../../../api/docente";
import { useParams } from "react-router-dom";
import {
  obtenerAsistenciasPeriodo,
  obtenerNombrePeriodo,
} from "../../../api/admin";
import Seleccionador from "../../../components/Seleccionador";
import Boton from "../../../components/Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function VerClase() {
  const { idPeriodo } = useParams();

  const clasesQuery = useQuery({
    queryKey: ["obtenerAsistenciasPeriodo"],
    queryFn: () => obtenerAsistenciasPeriodo(idPeriodo),
  });

  const periodoQuery = useQuery({
    queryKey: ["obtenerNombrePeriodo"],
    queryFn: () => obtenerNombrePeriodo(idPeriodo),
  });

  let nombrePeriodo = "";

  periodoQuery.isPending
    ? console.log("periodoquery")
    : (nombrePeriodo = periodoQuery.data);

  const datosGrafica = [
    {
      name: nombrePeriodo,
      "Asistencias ": clasesQuery.data?.asistencias ?? 0,
      "Inasistencias ": clasesQuery.data?.inasistencias ?? 0,
    },
  ];

  return (
    <div>
      <WebNav>
        <Link
          to="/admin/home"
          className="font-bold text-neutral-800 hover:text-neutral-900 hover:underline"
        >
          Periodos
        </Link>
        <Link
          to="/admin/docentes"
          className="hover:text-neutral-900 hover:underline"
        >
          Docentes
        </Link>
      </WebNav>

      <h2 className="pl- py-8 ps-16 text-2xl font-semibold">
        Periodo: {nombrePeriodo}
      </h2>
      <div className="space-y-4 pb-4">
        <Seleccionador datosGrafica={datosGrafica} />
        <Link
          to={`/admin/periodos/${idPeriodo}/detalle`}
          className="flex flex-col items-center justify-center hover:underline"
        >
          <Boton
            texto="Ver clases"
            icono={<ArrowForwardIcon />}
            tipo="primario"
            color={"verde"}
          />
        </Link>
      </div>
    </div>
  );
}

export default VerClase;
