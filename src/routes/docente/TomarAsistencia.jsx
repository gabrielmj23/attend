import PropTypes from "prop-types";
import AppHeader from "../../components/AppHeader";
import Scanner from "../../components/Scanner";
import Boton from "../../components/Boton";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useEffect } from "react";
import Quagga from "@ericblade/quagga2";
import { useState } from "react";
import { useRef } from "react";
import BotonAsistencia from "../../components/BotonAsistencia";

function TomarAsistencia({ nombreClase, lista }) {
  // Estado del escáner
  const [camaras, setCamaras] = useState([]);
  const [errorCamara, setErrorCamara] = useState(null);
  const [idCamara, setIdCamara] = useState(null);
  const scannerRef = useRef(null);
  // Estado de la asistencia
  const [asistencia, setAsistencia] = useState(
    lista.map((alumno) => {
      return { ...alumno, asistente: false };
    }),
  );

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
        <h2 className="ps-3 text-2xl font-semibold">
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
      <div className="flex flex-col">
        <h2 className="ps-3 text-2xl font-semibold">Marca manualmente</h2>
        <table className="w-11/12 text-center">
          <tbody>
            {lista.map((alumno, index) => (
              <tr key={alumno.cedula} className="align-middle">
                <td>{alumno.cedula}</td>
                <td>{alumno.nombre}</td>
                <td>
                  <BotonAsistencia
                    id={index}
                    cambiarAsistencia={(id) =>
                      setAsistencia((prev) => {
                        prev[id].asistente = !prev[id].asistente;
                        return prev;
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
