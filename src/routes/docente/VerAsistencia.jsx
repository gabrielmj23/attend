import PropTypes from "prop-types";
import AppHeader from "../../components/AppHeader";
import BotonAsistencia from "../../components/BotonAsistencia";
import { useState } from "react";
import Boton from "../../components/Boton";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useContext } from "react";
import { DocenteContext } from "./RootDocente";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { agregarAsistencia } from "../../api/asistencia";

function VerAsistencia({ idClase, asistencia }) {
  const [editAsistencia, setEditAsistencia] = useState(asistencia.asistencia);
  const fechaAsDate = asistencia.fecha.toDate();
  const fechaString = `${fechaAsDate.getMonth() + 1}-${fechaAsDate.getDate()}-${
    fechaAsDate.getYear() % 100
  }`;
  const fechaSep = fechaString.split("-");

  // Guardar asistencia en la base de datos si se edita
  const { user } = useContext(DocenteContext);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => {
      return agregarAsistencia({
        dir: `${user.user.uid}-${idClase}-${asistencia.fecha}`,
        asistencia: editAsistencia,
        fecha: asistencia.fecha,
        tema: asistencia.tema,
      });
    },
    onSuccess: () => {
      navigate("/docente/clases/" + idClase);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <AppHeader
        color="amarillo"
        titulo={`Asistencia del ${fechaSep[1]}/${fechaSep[0]}/${fechaSep[2]}`}
        atras={`/docente/clases/${idClase}`}
      />
      <div className="ps-3">
        <h2 className="text-xl font-semibold">Datos de la clase</h2>
        <ul className="text-md ps-4 pt-1">
          <li>
            <strong>- Tema:</strong> {asistencia.tema}
          </li>
          <li>
            <strong>- Asistentes:</strong> {asistencia.asistentes} estudiante(s)
          </li>
          <li>
            <strong>- Inasistentes:</strong> {asistencia.inasistentes}{" "}
            estudiante(s)
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="ps-3 text-xl font-semibold">Asistencia (editable)</h2>
        <table className="mx-auto border-collapse text-center">
          <tbody>
            {asistencia.asistencia.map((estudiante, index) => (
              <tr key={estudiante.cedula} className="border-b border-black">
                <td className="px-2">{estudiante.cedula}</td>
                <td className="px-2">{estudiante.nombre}</td>
                <td className="px-2">
                  <BotonAsistencia
                    asistencia={editAsistencia}
                    id={index}
                    cambiarAsistencia={(id) =>
                      setEditAsistencia(
                        editAsistencia.map((alumno, index) => {
                          if (index === id) {
                            return {
                              ...alumno,
                              asistente: !alumno.asistente,
                            };
                          }
                          return alumno;
                        }),
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row justify-center">
          <Boton
            texto="Guardar"
            tipo="primario"
            color="amarillo"
            icono={<SaveOutlinedIcon />}
            onClick={() => mutation.mutate()}
          />
          {mutation.isPending && (
            <>
              <p className="text-center">Guardando cambios...</p>
              <p className="text-center">
                Calcularemos también los reportes de asistencias...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

VerAsistencia.propTypes = {
  idClase: PropTypes.string.isRequired,
  asistencia: PropTypes.object.isRequired,
};

export default VerAsistencia;
