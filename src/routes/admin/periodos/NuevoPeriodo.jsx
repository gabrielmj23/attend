import { Link } from "react-router-dom";
import WebNav from "../../../components/WebNav";
import Boton from "../../../components/Boton";
import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { agregarPeriodo } from "../../../api/admin";

// Define el esquema de validación para un periodo
const periodoSchema = yup.object().shape({
  nombre: yup
    .string()  
    .required("Ingresa el nombre del periodo"),
  fechaInicio: yup
    .date()
    .transform((value, originalValue) => originalValue.trim() === "" ? undefined : value)
    .required("Ingresa la fecha de inicio"),
  fechaFin: yup
    .date()
    .transform((value, originalValue) => originalValue.trim() === "" ? undefined : value)
    .required("Ingresa la fecha de finalizacion")
    .test('fechaFin', 'La fecha de fin no puede ser igual a la fecha de inicio', function(value) { // La fecha de fin no puede ser igual a la fecha de inicio
        const { fechaInicio } = this.parent;
        if (!fechaInicio || !value) {
          return true; 
        }
        return fechaInicio < value;
    })
    .min(yup.ref('fechaInicio'), "La fecha de fin debe ser posterior a la fecha de inicio"), // La fecha de fin debe ser posterior a la fecha de inicio
  duracion: yup
    .number()
    .transform((value, originalValue) => originalValue.trim() === "" ? undefined : value)
    .required("Ingresa la duracion del periodo"),
});

function NuevoPeriodo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(periodoSchema) });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => {
      return agregarPeriodo({
        nombre: data.nombre,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        duracion: data.duracion,
      });
    },
    onSuccess: (data) => {
      navigate("/admin/home");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div>
      <WebNav>
        <Link to="/admin/home" className="hover:underline font-semibold">
          Periodos
        </Link>
        <Link
          to="/admin/docentes"
          className="text-neutral-800 hover:text-neutral-900 hover:underline"
        >
          Docentes
        </Link>
      </WebNav>
      <h1 className="py-8 ps-16 text-2xl font-semibold">Agregar un periodo</h1>
      <div className="flex w-screen flex-row justify-center">
        <form 
        onSubmit={handleSubmit(mutation.mutate)}
        className="flex w-1/2 max-w-lg flex-col gap-6"
        >
          <fieldset>
            <Input
              id="nombre"
              textoLabel="Nombre del periodo"
              textoPlaceholder="Nombre del periodo"
              {...register("nombre", { required: true })}
            />
            {errors.nombre && (
              <p role="alert" className="text-xs text-red-800">
                {errors.nombre.message}
              </p>
            )}
          </fieldset>
          <fieldset>
            <Input
              id="fechaInicio"
              type="date"
              textoLabel="Fecha de inicio"
              textoPlaceholder="Fecha de inicio"
              {...register("fechaInicio", { required: true })}
            />
            {errors.fechaInicio && (
              <p role="alert" className="text-xs text-red-800">
                {errors.fechaInicio.message}
              </p>
            )}
          </fieldset>
          <fieldset>
            <Input
              id="fechaFin"
              type="date"
              textoLabel="Fecha de finalización"
              textoPlaceholder="Fecha de finalización"
              {...register("fechaFin", { required: true })}
            />
            {errors.fechaFin && (
              <p role="alert" className="text-xs text-red-800">
                {errors.fechaFin.message}
              </p>
            )}
          </fieldset>
          <fieldset>
            <Input
              id="duracion"
              type="number"
              textoLabel="Duración (semanas)"
              textoPlaceholder="Duración (semanas)"
              {...register("duracion", { required: true })}
            />
            {errors.duracion && (
              <p role="alert" className="text-xs text-red-800">
                {errors.duracion.message}
              </p>
            )}
          </fieldset>
          <div className="flex w-2/3 flex-col justify-center gap-3 place-self-center">
            <div className="flex flex-row justify-center">
              <Boton
                texto="Guardar periodo"
                icono={<SaveOutlinedIcon />}
                tipo="primario"
                color="verde"
                sombra={true}
                type="submit"
              />
            </div>
            {mutation.isPending && (
              <p className="text-center">Guardando periodo...</p>
            )}
          </div>
        </form>
        </div>
    </div>
  );
}

export default NuevoPeriodo;