import AppHeader from "../../components/AppHeader";
import AppNav from "../../components/AppNav";
import NavElem from "../../components/NavElem";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function AjustesDocente() {
  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Ajustes" color="amarillo" />
      <div className="flex flex-row ps-5 pt-2 gap-5 align-middle">
        <PersonOutlineIcon fontSize="large" className="my-auto scale-125" />
        <div className="flex flex-col">
          <p className="text-xl font-semibold">Nombre profesor</p>
          <p className="text-gris text-sm font-semibold">Correo profesor</p>
        </div>
      </div>
      <p className="text-sm text-red-700 ps-5 underline">Cerrar sesión</p>
      <AppNav
        elementos={[
          <NavElem
            key={1}
            icono={<SchoolOutlinedIcon />}
            label="Clases"
            ruta="/docente"
          />,
          <NavElem
            key={2}
            icono={<AddCircleOutlineOutlinedIcon />}
            label="Nueva Clase"
            ruta="/docente/clases/nueva"
          />,
          <NavElem
            key={3}
            icono={<SettingsOutlinedIcon />}
            label="Ajustes"
            ruta="/docente/ajustes"
            activo="true"
          />,
        ]}
      />
    </div>
  );
}

export default AjustesDocente;
