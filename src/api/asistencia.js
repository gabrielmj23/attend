import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
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

export async function getAsistenciasDeAlumno({ idClase, cedula }) {
  try {
    const snapshot = await getDocs(
      query(
        collection(db, "asistencias"),
        where("idClase", "==", idClase),
      ),
    );
    if (!snapshot.empty) {
      const pepe = snapshot.docs
        .map((doc) => doc.data())
        .map((data) => {
          return {
            fecha: data.fecha,
            tema: data.tema,
            asistente: data.asistencia.find((ast) => ast.cedula === cedula)
              .asistente,
          };
        });
      return pepe;
    }
    return [];
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
    const dirSep = dir.split("-");
    const clase = await obtenerClase({
      idDocente: dirSep[0],
      idClase: dirSep[1],
    });
    if (!tema) {
      // Tomar tema del plan de clases
      temaAst = clase.plan.filter(
        (c) =>
          c.fecha.toDate().getDate() == dirSep[3] &&
          c.fecha.toDate().getMonth() + 1 == dirSep[2] &&
          c.fecha.toDate().getYear() % 100 == dirSep[4],
      )[0].tema;
    }

    // Actualizar reportes de alumnos
    for (const entrada of asistencia) {
      if (entrada.asistente) {
        await updateDoc(doc(db, "reportes", `${entrada.cedula}-${dirSep[1]}`), {
          asistencias: increment(1),
        });
      } else {
        await updateDoc(doc(db, "reportes", `${entrada.cedula}-${dirSep[1]}`), {
          inasistencias: increment(1),
        });
      }
    }

    // Guardar o actualizar
    const fecha2 = fecha.split("-").join("/");
    await setDoc(doc(db, "asistencias", dir), {
      fecha: new Date(fecha2),
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
