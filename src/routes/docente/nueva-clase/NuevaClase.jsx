import { useState } from "react";
import AppHeader from "../../../components/AppHeader";
import Input from "../../../components/Input";
import Boton from "../../../components/Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useEffect } from "react";
import { useContext } from "react";
import { DocenteContext } from "../RootDocente";
import { parseArchivo } from "../../../constants/excelSchemas";
import { agregarClase } from "../../../api/docente";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

function NuevaClase() {
  // Estados del formulario
  const [step, setStep] = useState(1);
  const [puedeAvanzar, setPuedeAvanzar] = useState(false);
  const [formdata, setFormdata] = useState({
    nombre: "",
    horario: null,
    alumnos: null,
    plan: null,
  });
  const [filasHorario, setFilasHorario] = useState(null);
  const [filasAlumnos, setFilasAlumnos] = useState(null);
  const [filasPlan, setFilasPlan] = useState(null);

  // Guardar contexto de la navegación actual
  const { user, navSetter } = useContext(DocenteContext);
  const navigate = useNavigate();
  useEffect(() => {
    navSetter({ type: "Nueva Clase", ruta: "/docente/clases/nueva" });
  }, [navSetter]);

  // Para subir el formulario
  const mutation = useMutation({
    mutationFn: () => {
      return agregarClase({
        idDocente: user.user.uid,
        nombre: formdata.nombre,
        horario: filasHorario,
        alumnos: filasAlumnos,
        plan: filasPlan,
        nombreDocente: user.user.nombre,
      });
    },
    onSuccess: (data) => {
      navigate("/docente/clases/" + data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Nueva Clase" color="amarillo" />
      {step === 1 && (
        <div className="flex w-2/3 flex-col justify-center gap-3 place-self-center">
          <h1 className="text-2xl font-semibold">
            Ingresa el nombre de la clase:
          </h1>
          <Input
            id="nombre"
            name="nombre"
            value={formdata.nombre}
            textoLabel=""
            textoPlaceholder="Nombre de la clase"
            onChange={(e) => {
              setPuedeAvanzar(e.target.value !== "");
              setFormdata({ ...formdata, nombre: e.target.value });
            }}
          />
          <div className="flex flex-row-reverse">
            <Boton
              texto="Siguiente"
              icono={<ArrowForwardIcon />}
              color={puedeAvanzar ? "amarillo" : "gris"}
              disabled={!puedeAvanzar}
              tipo="primario"
              type="button"
              onClick={() => {
                setStep((prev) => prev + 1);
                setPuedeAvanzar(filasHorario !== null);
              }}
            />
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex w-4/5 flex-col justify-center gap-4 place-self-center">
          <h1 className="text-2xl font-semibold">
            Carga el horario de clases:
          </h1>
          <Input
            id="horario"
            name="horario"
            textoLabel=""
            textoPlaceholder="Cargar archivo"
            type="file"
            icono={<UploadFileOutlinedIcon />}
            onChange={async (e) => {
              setFormdata({ ...formdata, horario: e.target.files[0] ?? null });
              if (e.target.files[0]) {
                const filas = await parseArchivo(e.target.files[0], "horario");
                console.log(filas);
                setFilasHorario(filas);
                setPuedeAvanzar(true);
              } else {
                setPuedeAvanzar(false);
                setFilasHorario(null);
              }
            }}
          />
          <table className="text-center">
            <thead>
              <tr>
                <th>Día</th>
                <th>Hora inicio</th>
                <th>Hora fin</th>
              </tr>
            </thead>
            <tbody>
              {filasHorario &&
                filasHorario
                  .map((fila) => Object.values(fila))
                  .map((fila, index) => (
                    <tr key={index}>
                      {fila.map((v, index) => (
                        <td key={index}>
                          {v instanceof Date ? v.toLocaleTimeString() : v}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
          <div className="flex flex-row justify-between">
            <Boton
              texto="Atrás"
              icono={<ArrowBackOutlinedIcon />}
              tipo="secundario"
              type="button"
              onClick={() => {
                setStep((prev) => prev - 1);
                setPuedeAvanzar(true);
              }}
            />
            <Boton
              texto="Siguiente"
              icono={<ArrowForwardIcon />}
              color={puedeAvanzar ? "amarillo" : "gris"}
              disabled={!puedeAvanzar}
              tipo="primario"
              type="button"
              onClick={() => {
                setStep((prev) => prev + 1);
                setPuedeAvanzar(filasAlumnos !== null);
              }}
            />
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex w-4/5 flex-col justify-center gap-4 place-self-center">
          <h1 className="text-2xl font-semibold">
            Carga la lista de asistencia:
          </h1>
          <Input
            id="alumnos"
            name="alumnos"
            textoLabel=""
            textoPlaceholder="Cargar archivo"
            type="file"
            icono={<UploadFileOutlinedIcon />}
            onChange={async (e) => {
              setFormdata({ ...formdata, alumnos: e.target.files[0] ?? null });
              if (e.target.files[0]) {
                const filas = await parseArchivo(e.target.files[0], "alumnos");
                console.log(filas);
                setFilasAlumnos(filas);
                setPuedeAvanzar(true);
              } else {
                setPuedeAvanzar(false);
                setFilasAlumnos(null);
              }
            }}
          />
          <table className="text-center">
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {filasAlumnos &&
                filasAlumnos
                  .map((fila) => Object.values(fila))
                  .map((fila, index) => (
                    <tr key={index}>
                      {fila.map((v, index) => (
                        <td key={index}>{v}</td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
          <div className="flex flex-row justify-between">
            <Boton
              texto="Atrás"
              icono={<ArrowBackOutlinedIcon />}
              tipo="secundario"
              type="button"
              onClick={() => {
                setStep((prev) => prev - 1);
                setPuedeAvanzar(true);
              }}
            />
            <Boton
              texto="Siguiente"
              icono={<ArrowForwardIcon />}
              color={puedeAvanzar ? "amarillo" : "gris"}
              disabled={!puedeAvanzar}
              tipo="primario"
              type="button"
              onClick={() => {
                setStep((prev) => prev + 1);
                setPuedeAvanzar(false);
              }}
            />
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="flex w-4/5 flex-col justify-center gap-4 place-self-center">
          <h1 className="text-2xl font-semibold">Carga el plan de clases:</h1>
          <Input
            id="plan"
            name="plan"
            textoLabel=""
            textoPlaceholder="Cargar archivo"
            type="file"
            icono={<UploadFileOutlinedIcon />}
            onChange={async (e) => {
              setFormdata({ ...formdata, plan: e.target.files[0] ?? null });
              if (e.target.files[0]) {
                const filas = await parseArchivo(e.target.files[0], "plan");
                console.log(filas);
                setFilasPlan(filas);
                setPuedeAvanzar(true);
              } else {
                setPuedeAvanzar(filasPlan !== null);
                setFilasPlan(null);
              }
            }}
          />
          <table className="text-center">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tema</th>
              </tr>
            </thead>
            <tbody>
              {filasPlan &&
                filasPlan
                  .map((fila) => Object.values(fila))
                  .map((fila, index) => (
                    <tr key={index}>
                      {fila.map((v, index) => (
                        <td key={index}>
                          {v instanceof Date
                            ? v.toLocaleDateString("es-ES", {
                                timeZone: "America/Caracas",
                              })
                            : v}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
          <div className="flex flex-row justify-between">
            <Boton
              texto="Atrás"
              icono={<ArrowBackOutlinedIcon />}
              tipo="secundario"
              type="button"
              onClick={() => {
                setStep((prev) => prev - 1);
                setPuedeAvanzar(true);
              }}
            />
            <Boton
              texto="Guardar"
              icono={<SaveOutlinedIcon />}
              color={puedeAvanzar ? "amarillo" : "gris"}
              disabled={!puedeAvanzar}
              tipo="primario"
              type="button"
              onClick={() => mutation.mutate()}
            />
          </div>
          {mutation.isPending && <p>Guardando...</p>}
        </div>
      )}
    </div>
  );
}

export default NuevaClase;
