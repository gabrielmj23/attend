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
import { agregarDocente } from "./docente";
import { agregarAlumno } from "./alumno";

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
 * @param {Object} docente
 * @param {string} docente.correo
 * @param {string} docente.nombre
 * @param {string} docente.password
 */
export async function signupDocente({ correo, nombre, password }) {
  try {
    // Guardar cuenta de docente
    const creds = await createUserWithEmailAndPassword(auth, correo, password);
    await updateProfile(creds.user, { displayName: nombre });
    await agregarDocente({ id: creds.user.uid, nombre, correo });
    // Devolver datos de docente
    return {
      uid: creds.user.uid,
      nombre: nombre,
      correo: correo,
      resumen_clases: [],
    };
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
  const tipo_msg = {
    admin: "administrador",
    docente: "docente",
    alumno: "alumno",
  };
  try {
    //Iniciar sesión
    await signInWithEmailAndPassword(auth, correo, password);
    // Confirmar que la cuenta es del tipo adecuado
    const db = getFirestore(app);
    const usuario = await getDocs(
      query(collection(db, tipo), where("correo", "==", correo)),
    );
    if (usuario.empty) {
      throw new Error("Error: Su cuenta no pertenece a " + tipo_msg[tipo]);
    }
    return { ...usuario.docs[0].data(), uid: auth.currentUser.uid };
  } catch (error) {
    if (error.code === "auth/invalid-login-credentials") {
      throw Error("Error: Correo o contraseña incorrecta");
    }
    if (error.code === "auth/network-request-failed") {
      throw Error("Error: Revisa tu conexión a internet");
    }
    throw error;
  }
}

export async function signUpAlumno({ nombre, cedula, correo, password }) {
  try {
    // Guardar cuenta de alumno
    const creds = await createUserWithEmailAndPassword(auth, correo, password);
    await updateProfile(creds.user, { displayName: nombre });
    const resumen = await agregarAlumno({ nombre, cedula, correo });
    // Devolver datos de alumno
    return {
      uid: creds.user.uid,
      nombre: nombre,
      cedula: cedula,
      correo: correo,
      resumen_clases: resumen,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error al crear el usuario");
  }
}
