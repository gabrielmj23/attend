import React from "react";
import WebNav from "../../../components/WebNav";
import { Link } from "react-router-dom";
function VerDocentes() {
  return (
    <div>
      <WebNav>
        <Link to="/admin/home" className="font-bold hover:underline">
          Periodos
        </Link>
        <Link
          to="/admin/docentes"
          className="text-neutral-800 hover:text-neutral-900 hover:underline"
        >
          Docentes
        </Link>
      </WebNav>

      <h1>Ver docentes</h1>
    </div>
  );
}

export default VerDocentes;
