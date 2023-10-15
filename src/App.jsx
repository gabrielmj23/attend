import Etiqueta from "./components/Etiqueta";

function App() {
  return (
    <div className="p-3">
      <Etiqueta
        texto="Nombre del periodo"
        texto2="Nombre del periodo"
      />
      <Etiqueta
        texto="Fecha de inicio"
        texto2="Fecha de inicio"
      />
      <Etiqueta
        texto="Fecha de finalización"
        texto2="Fecha de finalización"
      />
      <Etiqueta
        texto="Duración(semanas)"
        texto2="Duración(semanas)"
      />
    </div>
  );
}

export default App;

