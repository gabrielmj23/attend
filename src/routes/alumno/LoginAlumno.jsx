import { useContext } from "react";
import Boton from "../../components/Boton";
import Input from "../../components/Input";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AlumnoContext } from "./RootAlumno";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginUser } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const alumnoSchema = yup.object().shape({
  correo: yup
    .string()
    .required("El correo electrónico es requerido")
    .email("El correo electrónico debe ser válido"),
  password: yup.string().required("La contraseña es requerida"),
});

function LoginAlumno() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(alumnoSchema) });
  const navigate = useNavigate();
  const { userSetter } = useContext(AlumnoContext);

  const mutation = useMutation({
    mutationFn: (data) => {
      return loginUser({
        correo: data.correo,
        password: data.password,
        tipo: "alumnos",
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
    <div className=" to-degradado2 flex h-screen flex-col justify-center gap-5 bg-gradient-to-br from-degradado">
      <h1 className="text-center text-3xl font-bold">Attend</h1>
      <h2 className="text-center text-lg font-semibold">
        Inicia sesión como alumno
      </h2>
      <form
        onSubmit={handleSubmit(mutation.mutate)}
        className="flex flex-col justify-center gap-4 pe-10 ps-8"
      >
        <fieldset>
          <Input
            id="correo"
            textoLabel="Correo institucional"
            textoPlaceholder="Correo institucional"
            {...register("correo", { required: true })}
          />
          {errors.correo && <p className="text-xs">{errors.correo.message}</p>}
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
            <p className="text-xs">{errors.password.message}</p>
          )}
        </fieldset>
        <div className="flex flex-row justify-center">
          <Boton
            texto="Iniciar Sesion"
            icono={<ArrowForwardIcon />}
            color="blanco"
            tipo="primario"
            type="submit"
          />
        </div>
        <Link to="/alumno/signup" className="text-center underline">
          No tengo cuenta
        </Link>
      </form>
      {mutation.isPending && <p className="text-center">Iniciando sesión...</p>}
    </div>
  );
}

export default LoginAlumno;
