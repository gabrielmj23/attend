import {
  getFirestore,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  initializeAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "./firebase";
import { agregarAdmin } from "./admin";

const auth = initializeAuth(app);

/**
 * @param {Object} admin
 * @param {string} admin.correo
 * @param {string} admin.nombre
 * @param {string} admin.password
 */
export async function signUpAdmin({ correo, nombre, password }) {
  try {
    // Guardar cuenta de admin
    const creds = await createUserWithEmailAndPassword(auth, correo, password);
    await updateProfile(creds.user, { displayName: nombre });
    await agregarAdmin({ id: creds.user.uid, nombre, correo });
    // Devolver datos de usuario
    return auth.currentUser;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error al crear el usuario");
  }
}

/**
 * @param {Object} user
 * @param {string} user.correo
 * @param {string} user.password
 * @param {string} user.tipo
 */
export async function loginUser({ correo, password, tipo }) {
  try {
    // Confirmar que la cuenta es del tipo adecuado
    const db = getFirestore(app);
    const snapshot = await getDocs(
      query(collection(db, tipo), where("correo", "==", correo)),
    );
    if (snapshot.empty) {
      throw new Error(`Usuario no es de tipo ${tipo}`);
    }
    // Iniciar sesión
    const creds = await signInWithEmailAndPassword(auth, correo, password);
    return auth.currentUser;
  } catch (error) {
    throw new Error("Ocucrió un error al iniciar sesión");
  }
}
