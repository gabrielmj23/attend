import React, { useState } from "react";
import WebNav from "../../../components/WebNav";
import AppHeader from "../../../components/AppHeader";
import Input from "../../../components/Input";
import Boton from "../../../components/Boton";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { obtenerDocentes, eliminarDocente } from "../../../api/docente";
import { useNavigate } from "react-router-dom";
function VerDocentes() {
  const history = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["verDocente"],
    queryFn: () => obtenerDocentes(),
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  let array2;
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

      <AppHeader titulo="Docentes" color="blanco" />

      <div className="flex items-end justify-between">
        <div className="pl-40">
          <Input
            id="bucarDocente"
            icono={<SearchIcon />}
            textoLabel="Buscar Docente"
            textoPlaceholder="Docente"
            value={searchTerm}
            onChange={handleSearchChange}
          ></Input>
        </div>
        <div className="py-5 pr-40">
          <Link to="/admin/docentes/nuevo">
            <Boton
              texto="Agregar docente"
              icono={<AddCircleOutlineIcon />}
              tipo="primario"
              color="verde"
            />
          </Link>
        </div>
      </div>

      <div className="flex justify-center px-3 py-4">
        <table className="text-md mb-4 w-5/6 rounded shadow-md">
          <thead className="border-b border-black ">
            <tr>
              <th scope="col" className="px-20">
                Nombre
              </th>
              <th scope="col" className="border-x border-black px-20">
                Correo
              </th>
              <th scope="col" className="px-20">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="">
            {/* Rows go here */}
            {isPending ? (
              <p>Cargando docentes</p>
            ) : (
              data
                .filter((docente) =>
                  docente.nombre
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
                )
                .map((docente) => (
                  <tr>
                    <td className="text-center">{docente.nombre}</td>
                    <td className="border-x border-black text-center">
                      {docente.correo}
                    </td>
                    <td className="flex flex-row justify-center gap-4 p-2">
                      <Link to={`/admin/clases/${docente.id} `}>
                        <Boton
                          texto="Ver clases"
                          icono={<ArrowForwardIcon />}
                          tipo="primario"
                          color="verde"
                        />
                      </Link>

                      <Link to="/admin/docentes">
                        <Boton
                          texto="Eliminar"
                          icono={<DeleteIcon />}
                          tipo="primario"
                          color="rojo"
                          onClick={async () => {
                            if (
                              window.confirm(
                                "¿Estás seguro de que quieres eliminar este docente?",
                              )
                            ) {
                              await eliminarDocente(docente.id);
                              navigate(window.location.pathname);
                            }
                          }}
                        />
                      </Link>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VerDocentes;
