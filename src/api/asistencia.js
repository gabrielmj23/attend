import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebase";

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

export async function agregarAsistencia({ dir, fecha, asistencia }) {
  try {
    await setDoc(doc(db, "asistencias", dir), {
      fecha: new Date(fecha),
      asistencia,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
