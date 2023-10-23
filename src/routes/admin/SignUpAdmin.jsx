import Boton from "../../components/Boton";
import Input from "../../components/Input";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useForm } from "react-hook-form";

function SignUpAdmin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex h-screen flex-row items-center justify-center">
      <div className="max-w-lg flex-1 flex-col gap-5 rounded-lg border-4 border-verde p-8 text-center shadow-lg">
        <h1 className="mb-3 text-3xl font-bold">Attend</h1>
        <h2 className="mb-3 text-xl font-semibold">
          Crea tu cuenta de administrador
        </h2>
        <form className="flex flex-col gap-4 text-start">
          <Input
            id="nombre"
            textoLabel="Nombre completo"
            textoPlaceholder="Nombre completo"
            {...register("nombre", { required: true })}
          />
          <Input
            id="correo"
            textoLabel="Correo electrónico"
            textoPlaceholder="Correo electrónico"
            {...register("correo", { required: true })}
          />
          <Input
            id="password"
            textoLabel="Contraseña"
            textoPlaceholder="Contraseña"
            type="password"
            {...register("password", { required: true })}
          />
          <Input
            id="confirmacion"
            textoLabel="Confirmación de la contraseña"
            textoPlaceholder="Confirmación"
            type="password"
            {...register("confirmacion", { required: true })}
          />
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
        </form>
      </div>
    </div>
  );
}

export default SignUpAdmin;
