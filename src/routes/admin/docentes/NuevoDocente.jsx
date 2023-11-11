import { Link } from "react-router-dom";
import WebNav from "../../../components/WebNav";
import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Boton from "../../../components/Boton";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { signupDocente } from "../../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";

const docenteSchema = yup.object().shape({
  nombre: yup.string().required("Ingresa el nombre"),
  correo: yup
    .string()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Ingresa una contraseña"),
  confirmacion: yup
    .string()
    .required("Confirma la contraseña")
    .equals([yup.ref("password")], "Las contraseñas deben coincidir"),
});

function NuevoDocente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(docenteSchema) });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => {
      return signupDocente({
        correo: data.correo,
        nombre: data.nombre,
        password: data.password,
      });
    },
    onSuccess: () => {
      navigate("/admin/docentes/");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div>
      <WebNav>
        <Link to="/admin/home" className="hover:underline">
          Periodos
        </Link>
        <Link
          to="/admin/docentes"
          className="text-neutral-800 hover:text-neutral-900 hover:underline"
        >
          Docentes
        </Link>
      </WebNav>
      <h1 className="py-8 ps-16 text-2xl font-semibold">Agregar un docente</h1>
      <div className="flex w-screen flex-row justify-center">
        <form
          onSubmit={handleSubmit(mutation.mutate)}
          className="flex w-1/2 max-w-lg flex-col gap-6"
        >
          <fieldset>
            <Input
              id="nombre"
              textoLabel="Nombre completo del docente"
              textoPlaceholder="Nombre completo del docente"
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
              id="correo"
              textoLabel="Correo institucional del docente"
              textoPlaceholder="Correo institucional del docente"
              {...register("correo", { required: true })}
            />
            {errors.correo && (
              <p role="alert" className="text-xs text-red-800">
                {errors.correo.message}
              </p>
            )}
          </fieldset>
          <fieldset>
            <Input
              id="password"
              textoLabel="Contraseña"
              textoPlaceholder="Contraseña"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p role="alert" className="text-xs text-red-800">
                {errors.password.message}
              </p>
            )}
          </fieldset>
          <fieldset>
            <Input
              id="confirmacion"
              textoLabel="Confirmar contraseña"
              textoPlaceholder="Confirmar contraseña"
              type="password"
              {...register("confirmacion", { required: true })}
            />
          </fieldset>
          <div className="flex w-2/3 flex-col justify-center gap-3 place-self-center">
            <p className="text-center text-sm">
              Al registrar al docente, tendrá que comunicarle sus datos de
              ingreso al sistema
            </p>
            <div className="flex flex-row justify-center">
              <Boton
                texto="Agregar docente"
                icono={<SaveOutlinedIcon />}
                tipo="primario"
                color="verde"
                sombra={true}
                type="submit"
              />
            </div>
            {mutation.isError && (
              <p className="text-center font-semibold text-red-800">
                Ocurrió un error, intenta de nuevo
              </p>
            )}
            {mutation.isPending && (
              <span className="text-center">
                <Spinner color="success" /> Agregando docente...
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default NuevoDocente;
