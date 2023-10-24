import AppHeader from "./components/AppHeader";
import CardAsistencia from "./components/CardAsistencia";
import CardClase from "./components/CardClase";

function Landing() {
  return (
    <div className="flex flex-col gap-4">
      <AppHeader titulo="Tus Clases" color="amarillo" />
      <CardClase
        id="a"
        nombre="Algebra Lineal"
        horario={["Martes: 7:00 am a 10:00 am", "Viernes: 12:00 pm a 2:00 pm"]}
        color="amarillo"
      />
      <CardClase
        id="a"
        nombre="Algebra Lineal"
        horario={["Martes: 7:00 am a 10:00 am", "Viernes: 12:00 pm a 2:00 pm"]}
        color="azul"
      />
      <CardClase
        id="a"
        nombre="Algebra Lineal"
        horario={["Martes: 7:00 am a 10:00 am", "Viernes: 12:00 pm a 2:00 pm"]}
        color="verde"
      />
      <CardAsistencia
        fecha={new Date()}
        contenido="Matrices"
        color="amarillo"
      />
    </div>
  );
}

export default Landing;
