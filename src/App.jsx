import Boton from "./components/Boton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function App() {
  return (
    <div className="p-3">
      <Boton
        texto="Hola mundo"
        icono={<ArrowForwardIcon />}
        tipo="secundario"
        color="amarillo"
        sombra={true}
        onClick={() => "Hola mundo"}
      />
    </div>
  );
}

export default App;
