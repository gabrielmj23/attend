import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  getDocs,
  where,
  deleteDoc
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

export async function eliminarDocente(idDocente) {
  try {
    await deleteDoc(doc(db, "docentes", idDocente));
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
    if (snapshot.exists) {
      return snapshot.data();
    }
    throw new Error("Clase no existe");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtenerDocente({ idDocente}){
  try {
    const snapshot = await getDoc(doc(db, "docentes", idDocente));
    if (snapshot.exists) {
      return snapshot.data();
    }
    throw new Error("Docente no existe");
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export async function obtenerClases({idDocente}) {
  try {
    const snapshot = await getDocs(collection(db, "docentes", idDocente,"clases"));
    const clases = [];
    snapshot.forEach((doc) => {
      clases.push({ id: doc.id, ...doc.data() });
    });
    return clases;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function obtenerClasesDeDocentes(idsDocente) {
  try {
    const todasLasClases = [];
    for (const docente of idsDocente) {
      const clases = await obtenerClases({ idDocente: docente.id });
      todasLasClases.push(...clases);
    }
    return todasLasClases;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function obtenerDocentes() {
  try {
    const snapshot = await getDocs(collection(db, "docentes"));
    const docentes = [];
    snapshot.forEach((doc) => {
      docentes.push({ id: doc.id, ...doc.data() });
    });
    return docentes;
  } catch (error) {
    console.error(error);
    throw error;
  }
  
}
export async function obtenerIDsDocentes() {
  try {
    const snapshot = await getDocs(collection(db, "docentes"));
    const docentesIDs = [];
    snapshot.forEach((doc) => {
      docentesIDs.push( {id: doc.id, nombre: doc.data().nombre});
    });
    return docentesIDs;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtenerIDPeriodoActivo() {
  try {
    const snapshot = await getDocs(collection(db, "periodos"), where("activo", "==", true));
    return snapshot.docs[0].id;
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
    // Crear clase
    const claseRef = await addDoc(clasesDocente, {
      nombre,
      horario,
      alumnos,
      plan,
    });
    // Actualizar resumen de clases del docente
    await updateDoc(doc(db, "docentes", idDocente), {
      resumen_clases: arrayUnion({
        horario,
        nombre,
        uid: claseRef.id,
      }),
    });
    return claseRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtenerReporte ({idReporte}){
  try {
    const snapshot = await getDoc(doc(db, "reportes", idReporte));
    if (snapshot.exists) {
      return snapshot.data();
    }
    throw new Error("Reporte no existe");
  } catch (error) {
    console.error(error);
    throw error;
  }
}