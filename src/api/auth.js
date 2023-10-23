import { getFirestore, doc, getDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  initializeAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "./firebase";
import { createContext } from "react";
import { agregarAdmin } from "./admin";

const auth = initializeAuth(app);

/**
 *
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
    return {
      user: auth.currentUser,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error al crear el usuario");
  }
}
