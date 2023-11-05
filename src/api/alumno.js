import {
  arrayUnion,
  collection,
  doc,
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
 * @param {Object} alumno
 * @param {string} alumno.cedula
 * @param {string} alumno.correo
 */
export async function agregarAlumno({ nombre, cedula, correo }) {
  try {
    // Guardar registro de alumno
    await setDoc(doc(db, "alumnos", cedula), {
      nombre,
      cedula,
      correo,
      resumen_clases: [],
    });
    // Generar resumen de clases
    const snapshot = await getDocs(
      query(collection(db, "reportes"), where("cedula", "==", cedula)),
    );
    let resumen = [];
    if (!snapshot.empty) {
      resumen = snapshot.docs
        .map((doc) => doc.data())
        .map((data) => {
          return {
            uid: data.idClase,
            nombre: data.nombreClase,
            horario: data.horario,
            asistencias: data.asistencias,
            inasistencias: data.inasistencias,
            totalClases: data.totalClases,
            idDocente: data.idDocente,
          };
        });
      console.log(resumen);
      await updateDoc(doc(db, "alumnos", cedula), {
        resumen_clases: arrayUnion(...resumen),
      });
    }
    return resumen;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error al agregar al alumno");
  }
}
