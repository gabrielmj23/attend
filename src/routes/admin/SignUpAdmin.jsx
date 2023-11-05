import Boton from "../../components/Boton";
import Input from "../../components/Input";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { signUpAdmin } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminAuthContext } from "./RootAdmin";
import { useMutation } from "@tanstack/react-query";
import BotonAtras from "../../components/BotonAtras";

// Esquema de validación de registro
const adminSchema = yup.object().shape({
  nombre: yup.string().required("Ingresa tu nombre"),
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
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirma tu contraseña"),
});

function SignUpAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(adminSchema) });
  const navigate = useNavigate();
  const { userSetter } = useContext(AdminAuthContext);

  const mutation = useMutation({
    mutationFn: (data) => {
      return signUpAdmin({
        correo: data.correo,
        nombre: data.nombre,
        password: data.password,
      });
    },
    onSuccess: (data) => {
      userSetter({ type: "login", user: data });
      navigate("/admin/home");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div className="flex h-screen flex-row items-center justify-center">
      <div className="absolute left-5 top-5 flex flex-row align-middle">
        <BotonAtras path="/" text="Volver a inicio" />
      </div>
      <div className="max-w-lg flex-1 flex-col gap-5 rounded-lg border-4 border-verde p-8 text-center shadow-lg">
        <h1 className="mb-3 text-3xl font-bold">Attend</h1>
        <h2 className="mb-3 text-xl font-semibold">
          Crea tu cuenta de administrador
        </h2>
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
              id="correo"
              textoLabel="Correo electrónico"
              textoPlaceholder="Correo electrónico"
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
              color="verde"
              sombra={true}
              type="submit"
            />
          </div>
          {mutation.isPending && (
            <p className="text-center">Creando tu cuenta...</p>
          )}
          <div className="flex flex-row justify-center">
            <Link to="/admin/login" className="underline">
              Ya tengo cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpAdmin;
