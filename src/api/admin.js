import { doc, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore();

/**
 *
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
