import CardClase from "./components/CardClase";

function App() {
  return (
    <div className="p-3">
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
    </div>
  );
}

export default App;
