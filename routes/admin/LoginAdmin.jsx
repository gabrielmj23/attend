import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/Input";
import Boton from "../../components/Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { useContext } from "react";
import { AdminAuthContext } from "./RootAdmin";
import { useMutation } from "@tanstack/react-query";

const adminSchema = yup.object().shape({
  correo: yup
    .string()
    .required("El correo electrónico es requerido")
    .email("El correo electrónico debe ser válido"),
  password: yup.string().required("La contraseña es requerida"),
});

function LoginAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(adminSchema) });
  const navigate = useNavigate();
  const { userSetter } = useContext(AdminAuthContext);

  const mutation = useMutation({
    mutationFn: (data) => {
      return loginUser({
        correo: data.correo,
        password: data.password,
        tipo: "admins",
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
      <div className="max-w-lg flex-1 flex-col gap-5 rounded-lg border-4 border-verde p-8 text-center shadow-lg">
        <h1 className="mb-3 text-3xl font-bold">Attend</h1>
        <h2 className="mb-3 text-xl font-semibold">
          Inicia sesión como administrador
        </h2>
        <form
          className="flex flex-col gap-4 text-start"
          onSubmit={handleSubmit(mutation.mutate)}
        >
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
          <div className="flex flex-row justify-center">
            <Boton
              texto="Iniciar sesión"
              icono={<ArrowForwardIcon />}
              tipo="primario"
              color="verde"
              sombra={true}
              type="submit"
            />
          </div>
          {mutation.isPending && (
            <p className="text-center">Iniciando sesión...</p>
          )}
          <div className="flex flex-row justify-center">
            <Link to="/admin/signup" className="underline">
              No tengo cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
