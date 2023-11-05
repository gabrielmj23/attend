import Boton from "../../components/Boton";
import Input from "../../components/Input";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { signUpAlumno } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AlumnoContext } from "./RootAlumno";
import { useMutation } from "@tanstack/react-query";

// Esquema de validación de registro
const alumnoSchema = yup.object().shape({
  nombre: yup.string().required("Ingresa tu nombre"),
  cedula: yup.string().required("Ingresa tu cedula"),
  correo: yup
    .string()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo institucional"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Ingresa una contraseña"),
  confirmacion: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirma tu contraseña"),
});

function SignUpAlumno() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(alumnoSchema) });
  const navigate = useNavigate();
  const { userSetter } = useContext(AlumnoContext);

  const mutation = useMutation({
    mutationFn: (data) => {
      return signUpAlumno({
        nombre: data.nombre,
        cedula: data.cedula,
        correo: data.correo,
        password: data.password,
      });
    },
    onSuccess: (data) => {
      userSetter({ type: "login", user: data });
      navigate("/alumno/home");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div className="flex h-screen flex-row items-center justify-center bg-gradient-to-br from-degradado to-degradado2">
      <div className="max-w-lg flex-1 flex-col gap-5    text-center">
        <h1 className="mb-3 text-3xl font-bold">Attend</h1>
        <h2 className="mb-3 text-xl font-semibold">Crea tu cuenta</h2>
        <form
          className="flex flex-col gap-4 text-start"
          onSubmit={handleSubmit(mutation.mutate)}
        >
          <fieldset>
            <Input
              id="nombre"
              textoLabel="Nombre completo"
              textoPlaceholder="Nombre completo"
              {...register("nombre", { required: true })}
            />
            {errors.nombre?.message && (
              <p role="alert" className="text-xs text-red-800">
                {errors.nombre?.message}
              </p>
            )}
          </fieldset>
          <fieldset>
            <Input
              id="cedula"
              textoLabel="Cédula"
              textoPlaceholder="Cédula"
              {...register("cedula", { required: true })}
            />
            {errors.cedula?.message && (
              <p role="alert" className="text-xs text-red-800">
                {errors.cedula?.message}
              </p>
            )}
          </fieldset>
          <fieldset>
            <Input
              id="correo"
              textoLabel="Correo institucional"
              textoPlaceholder="Correo institucional"
              {...register("correo", { required: true })}
            />
            {errors.correo?.message && (
              <p role="alert" className="text-xs text-red-800">
                {errors.correo?.message}
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
            {errors.password?.message && (
              <p role="alert" className="text-xs text-red-800">
                {errors.password?.message}
              </p>
            )}
          </fieldset>
          <fieldset>
            <Input
              id="confirmacion"
              textoLabel="Confirmación de la contraseña"
              textoPlaceholder="Confirmación"
              type="password"
              {...register("confirmacion", { required: true })}
            />
            {errors.confirmacion?.message && (
              <p role="alert" className="text-xs text-red-800">
                {errors.confirmacion?.message}
              </p>
            )}
          </fieldset>
          <div className="flex flex-row justify-center">
            <Boton
              texto="Registrarte"
              icono={<ArrowForwardIcon />}
              tipo="primario"
              color="blanco"
              sombra={true}
              type="submit"
            />
          </div>
          {mutation.isPending && (
            <p className="text-center">Creando tu cuenta...</p>
          )}
          <div className="flex flex-row justify-center">
            <Link to="/alumno/login" className="underline">
              Ya tengo cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpAlumno;
