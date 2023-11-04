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
    <div className="flex flex-col gap-12 overflow-y-auto pb-32">
      <AppHeader color="amarillo" titulo={nombreClase} />
      <div className="flex flex-col justify-center">
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
          <form className="z-50">
            <select onChange={(e) => setIdCamara(e.target.value)}>
              {camaras.map((camara, index) => (
                <option key={camara.deviceId} value={camara.deviceId}>
                  {camara.label || "Cámara " + index}
                </option>
              ))}
            </select>
          </form>
        )}
        <div
          ref={scannerRef}
          className="flex max-h-[270px] max-w-[360px] flex-col"
        >
          <canvas
            className="drawingBuffer"
            style={{
              position: "absolute",
              top: "0px",
            }}
            width="360"
            height="270"
          />
          <Scanner
            scannerRef={scannerRef}
            cameraId={idCamara}
            onDetected={(resultado) => {
              const cedula = resultado.substring(1, resultado.length - 1);
              setAsistencia((prev) => {
                const index = prev.findIndex(
                  (alumno) => alumno.cedula === cedula,
                );
                if (index !== -1) {
                  return asistencia.map((alumno, idx) => {
                    if (index === idx) {
                      return { ...alumno, asistente: true };
                    }
                    return alumno;
                  });
                } else {
                  alert("El estudiante no se encuentra inscrito en la clase");
                }
                return prev;
              });
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <h2 className="ps-3 text-2xl font-semibold">O marca manualmente</h2>
          <table className="w-11/12 text-center">
            <tbody>
              {lista.map((alumno, index) => (
                <tr key={alumno.cedula} className="align-middle">
                  <td>{alumno.cedula}</td>
                  <td>{alumno.nombre}</td>
                  <td>
                    <BotonAsistencia
                      key={alumno.cedula}
                      id={index}
                      cambiarAsistencia={(id) =>
                        setAsistencia(
                          asistencia.map((alumno, index) => {
                            if (index === id) {
                              return {
                                ...alumno,
                                asistente: !alumno.asistente,
                              };
                            }
                            return alumno;
                          }),
                        )
                      }
                      asistencia={asistencia}
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
    </div>
  );
}

TomarAsistencia.propTypes = {
  nombreClase: PropTypes.string.isRequired,
  lista: PropTypes.array.isRequired,
};

export default TomarAsistencia;
