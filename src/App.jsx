import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import Input from "./components/Input";

function App() {
  return (
    <div className="p-3">
      <Input
        id="periodo"
        textoLabel="Nombre del periodo"
        textoPlaceholder="Nombre del periodo"
      />
      <Input
        id="fechaFin"
        textoLabel="Fecha de finalización"
        textoPlaceholder="Fecha de finalización"
        icono={<EventOutlinedIcon />}
      />
    </div>
  );
}

export default App;
