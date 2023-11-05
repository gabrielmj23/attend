import React from "react";
import { useLoaderData } from "react-router-dom";

function VerClase() {
  const { idDocente, idClase } = useLoaderData();
  console.log(idDocente, " + ", idClase);

  return (
    <div>
      <h1>Ver Clase</h1>
    </div>
  );
}

export default VerClase;
