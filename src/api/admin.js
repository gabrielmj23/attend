import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

const db = getFirestore(app);

/**
 * @param {Object} admin
 * @param {string} admin.id
 * @param {string} admin.nombre
 * @param {string} admin.correo
 */
export async function agregarAdmin({ id, nombre, correo }) {
  try {
    await setDoc(doc(db, "admins", id), {
      nombre,
      correo,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error al agregar el admin");
  }
}

/**
 * @param {Object} periodo
 * @param {string} periodo.id
 * @param {string} periodo.nombre
 * @param {date} periodo.fechaInicio
 * @param {date} periodo.fechaFin
 * @param {number} duracion
 */
export async function agregarPeriodo({ nombre, fechaInicio, fechaFin, duracion }) {

  try {
    const periodoRef = await addDoc(collection(db, "periodos"), {
      nombre,
      fechaInicio,
      fechaFin,
      duracion,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @param {Object} periodo
 * @param {string} periodo.id
 * @param {string} periodo.nombre
 * @param {date} periodo.fechaInicio
 * @param {date} periodo.fechaFin
 * @param {number} duracion
 */
export async function obtenerPeriodos() {
  try {
    const snapshot = await getDocs(collection(db, "periodos"));
    const periodos = [];
    snapshot.forEach((doc) => {
      periodos.push({ id: doc.id, ...doc.data() });
    });
    return periodos;
  } catch (error) {
    console.error(error);
    throw error;
  }
}