import PropTypes from "prop-types";
import AppHeader from "../../components/AppHeader";
import Scanner from "../../components/Scanner";
import Boton from "../../components/Boton";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useEffect } from "react";
import Quagga from "@ericblade/quagga2";
import { useState } from "react";
import { useRef } from "react";

function TomarAsistencia({ nombreClase, lista }) {
  const [camaras, setCamaras] = useState([]);
  const [errorCamara, setErrorCamara] = useState(null);
  const [idCamara, setIdCamara] = useState(null);
  const scannerRef = useRef(null);

  // Solicitar acceso y activar cámara al momento de montar el componente
  useEffect(() => {
    const activarCamara = async () => {
      await Quagga.CameraAccess.request(null, {});
    };
    const desactivarCamara = async () => {
      await Quagga.CameraAccess.release();
    };
    const enumerarCamaras = async () => {
      return await Quagga.CameraAccess.enumerateVideoDevices();
    };
    activarCamara()
      .then(desactivarCamara)
      .then(enumerarCamaras)
      .then((camaras) => setCamaras(camaras))
      .then(() => Quagga.CameraAccess.disableTorch())
      .catch((err) => setErrorCamara(err));
    return () => desactivarCamara();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <AppHeader color="amarillo" titulo={nombreClase} />
      <div>
        <h2 className="text-2xl font-semibold">
          Escanea el código de barras detrás de tu carnet
        </h2>
        {errorCamara ? (
          <p className="text-center text-lg font-semibold text-red-800">
            Error activando camara - {errorCamara.toString()}
          </p>
        ) : null}
        {camaras.length === 0 ? (
          <p className="text-center text-lg">Identificando cámaras...</p>
        ) : (
          <form>
            <select onChange={(e) => setIdCamara(e.target.value)}>
              {camaras.map((camara, index) => (
                <option key={camara.deviceId} value={`Cámara ${index}`}>
                  {camara.label || camara.deviceId}
                </option>
              ))}
            </select>
          </form>
        )}
        <div ref={scannerRef}>
          <canvas
            className="drawingBuffer"
            style={{
              position: "absolute",
              top: "0px",
            }}
            width="640"
            height="480"
          />
          <Scanner
            scannerRef={scannerRef}
            cameraId={idCamara}
            onDetected={() => console.log("detectado")}
          />
        </div>
      </div>
      <h2 className="text-2xl font-semibold">Marca manualmente</h2>
      <div className="flex flex-row justify-center">
        <Boton
          texto="Guardar"
          tipo="primario"
          color="amarillo"
          icono={<SaveOutlinedIcon />}
        />
      </div>
    </div>
  );
}

TomarAsistencia.propTypes = {
  nombreClase: PropTypes.string.isRequired,
  lista: PropTypes.array.isRequired,
};

export default TomarAsistencia;
