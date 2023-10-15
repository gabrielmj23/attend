import AppHeader from "../../components/AppHeader";
import AppNav from "../../components/AppNav";
import CardClase from "../../components/CardClase";
import NavElem from "../../components/NavElem";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function HomeDocente() {
  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Tus Clases" color="amarillo" />
      <CardClase
        id="1"
        nombre="Algebra Lineal"
        horario={["Martes: 7:00 am a 10:00 am", "Viernes: 12:00 pm a 2:00 pm"]}
        color="amarillo"
      />
      <CardClase
        id="2"
        nombre="Algebra Lineal"
        horario={["Martes: 7:00 am a 10:00 am", "Viernes: 12:00 pm a 2:00 pm"]}
        color="azul"
      />
      <CardClase
        id="3"
        nombre="Algebra Lineal"
        horario={["Martes: 7:00 am a 10:00 am", "Viernes: 12:00 pm a 2:00 pm"]}
        color="verde"
      />
      <AppNav
        elementos={[
          <NavElem
            key={1}
            icono={<SchoolOutlinedIcon />}
            label="Clases"
            ruta="/docente"
            activo={true}
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
          />,
        ]}
      />
    </div>
  );
}

export default HomeDocente;
