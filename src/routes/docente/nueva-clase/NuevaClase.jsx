import { useState } from "react";
import AppHeader from "../../../components/AppHeader";
import Input from "../../../components/Input";
import Boton from "../../../components/Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useContext } from "react";
import { DocenteContext } from "../RootDocente";
import { parseArchivo } from "../../../constants/excelSchemas";
import { agregarClase, obtenerIDPeriodoActivo } from "../../../api/docente";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { escuelas } from "../../../constants/escuelas";

function NuevaClase() {
  // Estados del formulario
  const [step, setStep] = useState(1);
  const [puedeAvanzar, setPuedeAvanzar] = useState(false);
  const [formState, setFormState] = useState({
    nombre: "",
    escuela: escuelas[0],
    horario: [],
    alumnos: [],
    plan: [],
  });

  // Guardar contexto de la navegación actual
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { navSetter } = useContext(DocenteContext);
  const navigate = useNavigate();
  useEffect(() => {
    navSetter({ type: "Nueva Clase", ruta: "/docente/clases/nueva" });
  }, [navSetter]);

  // Verificar que exista un periodo activo antes de crear la clase
  const periodoQuery = useQuery({
    queryKey: ["hayPeriodo"],
    queryFn: () => obtenerIDPeriodoActivo(),
    staleTime: 1000 * 60 * 60 * 24 * 7 * 15,
    cacheTime: 1000 * 60 * 60 * 24 * 7 * 15,
  });

  // Para subir el formulario
  const mutation = useMutation({
    mutationFn: () => {
      return agregarClase({
        idDocente: user.uid,
        nombreDocente: user.nombre,
        ...formState,
      });
    },
    onSuccess: (data) => {
      user.resumen_clases.push({
        horario: formState.horario,
        nombre: formState.nombre,
        uid: data,
      });
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/docente/clases/" + data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Nueva Clase" color="amarillo" />
      {periodoQuery.isPending ? (
        <p className="text-center">
          <Spinner /> Cargando...
        </p>
      ) : !periodoQuery.data ? (
        <div className="flex max-w-xs flex-col place-self-center pt-3">
          <p className="text-center font-semibold">
            No hay período académico activo
          </p>
          <p className="pt-3 text-center font-semibold">
            Cuando haya uno, podrás crear tus clases
          </p>
        </div>
      ) : (
        <div className="flex w-screen flex-col justify-center">
          {step === 1 && (
            <div className="flex w-2/3 flex-col justify-center gap-3 place-self-center">
              <h1 className="text-2xl font-semibold">
                Ingresa el nombre de la clase:
              </h1>
              <Input
                id="nombre"
                name="nombre"
                value={formState.nombre}
                textoLabel=""
                textoPlaceholder="Nombre de la clase"
                onChange={(e) => {
                  setPuedeAvanzar(
                    e.target.value !== "" && formState.escuela !== "",
                  );
                  setFormState({ ...formState, nombre: e.target.value });
                }}
              />

              <h1 className="pt-8 text-2xl font-semibold">
                Selecciona la escuela:
              </h1>
              <select
                id="escuela"
                name="escuela"
                required={true}
                value={formState.escuela}
                className="rounded-md p-1 text-sm"
                onChange={(e) => {
                  setPuedeAvanzar(
                    formState.nombre !== "" && e.target.value !== "",
                  );
                  setFormState({ ...formState, escuela: e.target.value });
                }}
              >
                {escuelas.map((escuela) => (
                  <option key={escuela}>{escuela}</option>
                ))}
              </select>
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
                    setPuedeAvanzar(formState.horario.length !== 0);
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
                  if (e.target.files[0]) {
                    const filas = await parseArchivo(
                      e.target.files[0],
                      "horario",
                    );
                    if (filas.length === 0) {
                      alert("El archivo no tiene el formato correcto");
                    } else {
                      setFormState({ ...formState, horario: filas });
                      setPuedeAvanzar(true);
                    }
                  } else {
                    setPuedeAvanzar(false);
                    setFormState({ ...formState, horario: [] });
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
                  {formState.horario.length
                    ? formState.horario
                        .map((fila) => Object.entries(fila))
                        .map((fila, indexRow) => (
                          <tr
                            key={indexRow}
                            className="border-b border-gray-600"
                          >
                            {fila.map((tupla, indexCol) => (
                              <td
                                key={indexCol}
                                className="max-w-xs bg-gray-200 py-2"
                              >
                                <input
                                  className="w-[80px] text-sm"
                                  value={tupla[1]}
                                  onChange={(e) => {
                                    setFormState((prev) => {
                                      const fState =
                                        window.structuredClone(prev);
                                      fState.horario[indexRow][tupla[0]] =
                                        e.target.value;
                                      return fState;
                                    });
                                  }}
                                ></input>
                              </td>
                            ))}
                            <td>
                              <button
                                type="button"
                                className="w-fit rounded-full bg-red-500 p-1"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "¿Estás seguro de que quieres eliminar esta fila?",
                                    )
                                  ) {
                                    setFormState((prev) => {
                                      const fState =
                                        window.structuredClone(prev);
                                      fState.horario.splice(indexRow, 1);
                                      return fState;
                                    });
                                    setPuedeAvanzar(
                                      formState.horario.length > 1,
                                    );
                                  }
                                }}
                              >
                                <RemoveOutlinedIcon />
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}
                </tbody>
              </table>
              <div className="flex justify-center gap-8 text-center">
                <button
                  type="button"
                  className="w-fit rounded-full bg-verde p-1"
                  onClick={() => {
                    setFormState((prev) => {
                      const fState = window.structuredClone(prev);
                      fState.horario.push({
                        dia: "",
                        horaInicio: "",
                        horaFin: "",
                      });
                      return fState;
                    });
                    setPuedeAvanzar(true);
                  }}
                >
                  <AddOutlinedIcon />
                </button>
              </div>
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
                    setPuedeAvanzar(formState.alumnos.length !== 0);
                  }}
                />
              </div>
            </div>
          )}
          {step === 3 ? (
            <div className="flex w-full flex-col justify-center gap-4 place-self-center overflow-y-auto px-3 pb-44">
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
                  if (e.target.files[0]) {
                    const filas = await parseArchivo(
                      e.target.files[0],
                      "alumnos",
                    );
                    if (filas.length === 0) {
                      alert("El archivo no tiene el formato correcto");
                    } else {
                      setFormState({ ...formState, alumnos: filas });
                      setPuedeAvanzar(true);
                    }
                  } else {
                    setPuedeAvanzar(false);
                    setFormState({ ...formState, alumnos: [] });
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
                  {formState.alumnos.length
                    ? formState.alumnos
                        .map((fila) => Object.entries(fila))
                        .map((fila, indexRow) => (
                          <tr key={indexRow}>
                            {fila.map((tupla, indexCol) => (
                              <td
                                key={indexCol}
                                className="max-w-xs bg-gray-200 py-2"
                              >
                                <input
                                  className="w-[150px] text-sm"
                                  value={tupla[1]}
                                  onChange={(e) => {
                                    setFormState((prev) => {
                                      const fState =
                                        window.structuredClone(prev);
                                      fState.alumnos[indexRow][tupla[0]] =
                                        e.target.value;
                                      return fState;
                                    });
                                  }}
                                ></input>
                              </td>
                            ))}
                            <td>
                              <button
                                type="button"
                                className="w-fit rounded-full bg-red-500 p-1"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "¿Estás seguro de que quieres eliminar esta fila?",
                                    )
                                  ) {
                                    setFormState((prev) => {
                                      const fState =
                                        window.structuredClone(prev);
                                      fState.alumnos.splice(indexRow, 1);
                                      return fState;
                                    });
                                    setPuedeAvanzar(
                                      formState.alumnos.length > 1,
                                    );
                                  }
                                }}
                              >
                                <RemoveOutlinedIcon />
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}
                </tbody>
              </table>
              <div className="text-center">
                <button
                  type="button"
                  className="w-fit rounded-full bg-verde p-1"
                  onClick={() => {
                    setFormState((prev) => {
                      const fState = window.structuredClone(prev);
                      fState.alumnos.push({
                        cedula: "",
                        nombre: "",
                      });
                      return fState;
                    });
                    setPuedeAvanzar(true);
                  }}
                >
                  <AddOutlinedIcon />
                </button>
              </div>
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
                    setPuedeAvanzar(formState.plan.length !== 0);
                  }}
                />
              </div>
            </div>
          ) : null}
          {step === 4 && (
            <div className="flex w-full flex-col justify-center gap-4 place-self-center overflow-y-auto px-3 pb-44">
              <h1 className="text-2xl font-semibold">
                Carga el plan de clases:
              </h1>
              <Input
                id="plan"
                name="plan"
                textoLabel=""
                textoPlaceholder="Cargar archivo"
                type="file"
                icono={<UploadFileOutlinedIcon />}
                onChange={async (e) => {
                  if (e.target.files[0]) {
                    const filas = await parseArchivo(e.target.files[0], "plan");
                    if (filas.length === 0) {
                      alert("El archivo no tiene el formato correcto");
                    } else {
                      setFormState({ ...formState, plan: filas });
                      setPuedeAvanzar(true);
                    }
                  } else {
                    setFormState({ ...formState, plan: [] });
                    setPuedeAvanzar(false);
                  }
                }}
              />
              <table className="text-center">
                <thead>
                  <tr>
                    <th>Semana</th>
                    <th>Fecha</th>
                    <th>Tema</th>
                  </tr>
                </thead>
                <tbody>
                  {formState.plan.length
                    ? formState.plan
                        .map((fila) => Object.entries(fila))
                        .map((fila, indexRow) => (
                          <tr key={indexRow}>
                            {fila.map((tupla, indexCol) => (
                              <td
                                key={indexCol}
                                className="max-w-xs bg-gray-200 py-2"
                              >
                                <input
                                  className="w-[150px] text-sm"
                                  value={
                                    tupla[1] instanceof Date
                                      ? tupla[1].toLocaleDateString()
                                      : tupla[1]
                                  }
                                  onChange={(e) => {
                                    setFormState((prev) => {
                                      const fState =
                                        window.structuredClone(prev);
                                      fState.plan[indexRow][tupla[0]] =
                                        e.target.value;
                                      return fState;
                                    });
                                  }}
                                ></input>
                              </td>
                            ))}
                            <td>
                              <button
                                type="button"
                                className="w-fit rounded-full bg-red-500 p-1"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "¿Estás seguro de que quieres eliminar esta fila?",
                                    )
                                  ) {
                                    setFormState((prev) => {
                                      const fState =
                                        window.structuredClone(prev);
                                      fState.plan.splice(indexRow, 1);
                                      return fState;
                                    });
                                    setPuedeAvanzar(formState.plan.length > 1);
                                  }
                                }}
                              >
                                <RemoveOutlinedIcon />
                              </button>
                            </td>
                          </tr>
                        ))
                    : null}
                </tbody>
              </table>
              <div className="text-center">
                <button
                  type="button"
                  className="w-fit rounded-full bg-verde p-1"
                  onClick={() => {
                    setFormState((prev) => {
                      const fState = window.structuredClone(prev);
                      fState.plan.push({
                        semana: "",
                        fecha: "",
                        tema: "",
                      });
                      return fState;
                    });
                    setPuedeAvanzar(true);
                  }}
                >
                  <AddOutlinedIcon />
                </button>
              </div>
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
              {mutation.isPending && (
                <span className="text-center">
                  <Spinner /> Guardando...
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NuevaClase;
