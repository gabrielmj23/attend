import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebase";
import { obtenerClase } from "./docente";

const db = getFirestore(app);

/**
 * @param {string} dir
 */
export async function getAsistencia(dir) {
  try {
    const snapshot = await getDoc(doc(db, "asistencias", dir));
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 *
 * @param {object} asist
 * @param {string} asist.dir
 * @param {string} asist.fecha
 * @param {Array} asist.asistencia
 * @param {string?} asist.tema
 */
export async function agregarAsistencia({ dir, fecha, asistencia, tema }) {
  try {
    // Conseguir tema de la clase correspondiente a esta asistencia
    let temaAst = tema;
    if (!tema) {
      const dirSep = dir.split("-");
      const clase = await obtenerClase({
        idDocente: dirSep[0],
        idClase: dirSep[1],
      });
      temaAst = clase.plan.filter(
        (c) =>
          c.getDate() === dirSep[3] &&
          c.getMonth() + 1 === dirSep[2] &&
          c.getYear() % 100 === dirSep[4],
      )[0].tema;
    }

    // Guardar o actualizar
    await setDoc(doc(db, "asistencias", dir), {
      fecha: new Date(fecha),
      asistencia,
      asistentes: asistencia.filter((a) => a.asistente).length,
      inasistentes: asistencia.filter((a) => !a.asistente).length,
      tema: temaAst,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
