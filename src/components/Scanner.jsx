import { useCallback, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import Quagga from "@ericblade/quagga2";

/**
 *
 * @param {number[]} arr
 * @returns
 */
function mediana(arr) {
  const newArr = [...arr];
  newArr.sort((a, b) => a - b);
  const mitad = Math.floor(newArr.length / 2);
  if (newArr.length % 2 === 1) {
    return newArr[mitad];
  }
  return (newArr[mitad - 1] + newArr[mitad]) / 2;
}

function medianaDeErrores(decodificados) {
  const errores = decodificados.flatMap((x) => x.error);
  return mediana(errores);
}

const defaultConstraints = {
  width: 640,
  height: 480,
};

const defaultLocatorSettings = {
  patchSize: "medium",
  halfSample: true,
  willReadFrequently: true,
};

const defaultDecoders = ["codabar_reader"];

function Scanner({
  onDetected,
  scannerRef,
  onScannerReady,
  cameraId,
  facingMode,
  constraints = defaultConstraints,
  locator = defaultLocatorSettings,
  decoders = defaultDecoders,
  locate = true,
}) {
  const errorCheck = useCallback(
    (result) => {
      if (!onDetected) {
        return;
      }
      const err = medianaDeErrores(result.codeResult.decodedCodes);
      // Aceptar con certeza de 75% o más
      if (err < 0.25) {
        onDetected(result.codeResult.code);
      }
    },
    [onDetected],
  );

  const handleProcesado = (resultado) => {
    const ctxDibujo = Quagga.canvas.ctx.overlay;
    ctxDibujo.font = "24px Arial";
    ctxDibujo.fillStyle = "green";

    if (resultado) {
      if (resultado.box) {
        Quagga.ImageDebug.drawPath(resultado.box, { x: 0, y: 1 }, ctxDibujo, {
          color: "blue",
          lineWidth: 2,
        });
      }
      if (resultado.codeResult && resultado.codeResult.code) {
        ctxDibujo.font = "24px Arial";
        ctxDibujo.fillText(resultado.codeResult.code, 10, 20);
      }
    }
  };

  useLayoutEffect(() => {
    let ignorar = false;
    const init = async () => {
      // Esperar un tick
      await new Promise((resolve) => setTimeout(resolve, 5));
      if (ignorar) {
        return;
      }
      // Inicializar scanner
      await Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            constraints: {
              ...constraints,
              ...(cameraId && { deviceId: cameraId }),
              ...(!cameraId && { facingMode }),
            },
            target: scannerRef.current,
            willReadFrequently: true,
          },
          locator,
          decoder: { readers: decoders },
          locate,
        },
        async (err) => {
          Quagga.onProcessed(handleProcesado);
          if (err) {
            return console.error("Error starting Quagga:", err);
          }
          if (scannerRef && scannerRef.current) {
            await Quagga.start();
            if (onScannerReady) {
              onScannerReady();
            }
          }
        },
      );
      Quagga.onDetected(errorCheck);
    };
    init();
    // Finaliza apagando la cámara
    return () => {
      ignorar = true;
      Quagga.stop();
      Quagga.offDetected(errorCheck);
      Quagga.offProcessed(handleProcesado);
    };
  }, [
    cameraId,
    onDetected,
    onScannerReady,
    scannerRef,
    errorCheck,
    constraints,
    locator,
    decoders,
    locate,
    facingMode,
  ]);
  return null;
}

Scanner.propTypes = {
  onDetected: PropTypes.func.isRequired,
  scannerRef: PropTypes.object.isRequired,
  onScannerReady: PropTypes.func,
  cameraId: PropTypes.string,
  facingMode: PropTypes.string,
  constraints: PropTypes.object,
  locator: PropTypes.object,
  decoders: PropTypes.array,
  locate: PropTypes.bool,
};

export default Scanner;
