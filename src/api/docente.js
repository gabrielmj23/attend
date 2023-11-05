import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

/**
 * @param {Object} docente
 * @param {string} docente.id
 * @param {string} docente.nombre
 * @param {string} docente.correo
 */
export async function agregarDocente({ id, nombre, correo }) {
  try {
    await setDoc(doc(db, "docentes", id), {
      nombre,
      correo,
      resumen_clases: [],
    });
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error al agregar el docente");
  }
}

/**
 *
 * @param {string} idClase
 */
export async function obtenerReportes(idClase) {
  try {
    const reportes = await getDocs(
      query(collection(db, "reportes"), where("idClase", "==", idClase)),
    );
    if (!reportes.empty) {
      return reportes.docs;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @param {Object} obj
 * @param {string} obj.idDocente
 * @param {string} obj.idClase
 */
export async function obtenerClase({ idDocente, idClase }) {
  try {
    const snapshot = await getDoc(
      doc(db, "docentes", idDocente, "clases", idClase),
    );
    if (snapshot.exists()) {
      return snapshot.data();
    }
    throw new Error("Clase no existe");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 *
 * @param {Object} clase
 * @param {string} clase.idDocente
 * @param {string} clase.nombre
 * @param {Array} clase.horario
 * @param {Array} clase.alumnos
 * @param {Array} clase.plan
 */
export async function agregarClase({
  idDocente,
  nombre,
  horario,
  alumnos,
  plan,
}) {
  try {
    const clasesDocente = collection(db, "docentes", idDocente, "clases");
    // Obtener periodo activo
    const snapshotPeriodo = await getDocs(
      collection(db, "periodos"),
      where("activo", "==", true),
    );
    // Crear clase
    const claseRef = await addDoc(clasesDocente, {
      nombre,
      horario,
      alumnos,
      plan,
      totalClases: plan.length,
      idPeriodo: snapshotPeriodo.docs[0].id,
    });
    // Actualizar resumen de clases del docente
    await updateDoc(doc(db, "docentes", idDocente), {
      resumen_clases: arrayUnion({
        horario,
        nombre,
        uid: claseRef.id,
      }),
    });
    // Crear reportes de estudiantes
    for (const alumno of alumnos) {
      await setDoc(doc(db, "reportes", `${alumno.cedula}-${claseRef.id}`), {
        cedula: alumno.cedula,
        nombre: alumno.nombre,
        idClase: claseRef.id,
        nombreClase: nombre,
        horario: horario,
        asistencias: 0,
        inasistencias: 0,
        totalClases: plan.length,
        idDocente: idDocente,
      });
    }
    return claseRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
