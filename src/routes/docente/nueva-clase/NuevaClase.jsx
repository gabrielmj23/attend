import { useState } from "react";
import AppHeader from "../../../components/AppHeader";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import Boton from "../../../components/Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useEffect } from "react";
import { useContext } from "react";
import { DocenteContext } from "../RootDocente";

function NuevaClase() {
  // Estados del formulario
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Guardar contexto de la navegación actual
  const { navSetter } = useContext(DocenteContext);
  useEffect(() => {
    navSetter({ type: "Nueva Clase", ruta: "/docente/clases/nueva" });
  }, [navSetter]);

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
            textoLabel=""
            textoPlaceholder="Nombre de la clase"
            {...register("nombre", { required: true })}
          />
          <div className="flex flex-row-reverse">
            <Boton
              texto="Siguiente"
              icono={<ArrowForwardIcon />}
              color="amarillo"
              tipo="primario"
              type="button"
              onClick={() => setStep(2)}
            />
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex h-2/3 flex-col justify-center gap-4 place-self-center">
          <h1 className="text-2xl font-semibold">
            Carga el horario de clases:
          </h1>
          <Input
            id="horario"
            textoLabel=""
            textoPlaceholder="Cargar archivo"
            type="file"
            icono={<UploadFileOutlinedIcon />}
            {...register("horario", { required: true })}
            onChange={(e) => console.log(e.target.files)}
          />
          <div className="flex flex-row justify-between">
            <Boton
              texto="Atrás"
              icono={<ArrowBackOutlinedIcon />}
              tipo="secundario"
              type="button"
              onClick={() => setStep(1)}
            />
            <Boton
              texto="Siguiente"
              icono={<ArrowForwardIcon />}
              color="amarillo"
              tipo="primario"
              type="button"
              onClick={() => setStep(3)}
            />
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col justify-center gap-4 place-self-center">
          <h1 className="text-2xl font-semibold">
            Carga la lista de asistencia:
          </h1>
          <Input
            id="alumnos"
            textoLabel=""
            textoPlaceholder="Cargar archivo"
            type="file"
            icono={<UploadFileOutlinedIcon />}
            {...register("alumnos", { required: true })}
          />
          <div className="flex flex-row justify-between">
            <Boton
              texto="Atrás"
              icono={<ArrowBackOutlinedIcon />}
              tipo="secundario"
              type="button"
              onClick={() => setStep(2)}
            />
            <Boton
              texto="Siguiente"
              icono={<ArrowForwardIcon />}
              color="amarillo"
              tipo="primario"
              type="button"
              onClick={() => setStep(4)}
            />
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="flex flex-col justify-center gap-4 place-self-center">
          <h1 className="text-2xl font-semibold">Carga el plan de clases:</h1>
          <Input
            id="plan"
            textoLabel=""
            textoPlaceholder="Cargar archivo"
            type="file"
            icono={<UploadFileOutlinedIcon />}
            {...register("plan", { required: true })}
          />
          <div className="flex flex-row justify-between">
            <Boton
              texto="Atrás"
              icono={<ArrowBackOutlinedIcon />}
              tipo="secundario"
              type="button"
              onClick={() => setStep(3)}
            />
            <Boton
              texto="Guardar"
              icono={<SaveOutlinedIcon />}
              color="amarillo"
              tipo="primario"
              type="button"
              onClick={() => setStep(3)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NuevaClase;
