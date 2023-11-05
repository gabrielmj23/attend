import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
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
    await setDoc(doc(db, "alumnos", cedula), {
      nombre,
      cedula,
      correo,
      resumen_clases: [],
    });
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error al agregar al alumno");
  }
}

