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
  deleteDoc,
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
 * @param {string} idDocente
 */
export async function eliminarDocente(idDocente) {
  try {
    await deleteDoc(doc(db, "docentes", idDocente));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 *
 * @param {string} idClase
 */
export async function obtenerReportesDeClase(idClase) {
  try {
    const reportes = await getDocs(
      query(collection(db, "reportes"), where("idClase", "==", idClase)),
    );
    if (reportes.empty) {
      return null;
    }
    return reportes.docs;
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
    console.log("idDocente: ", idDocente, "idClase: ", idClase);
    const clase = await getDoc(
      doc(db, "docentes", idDocente, "clases", idClase),
    );
    if (clase.exists()) {
      console.log("Clase existe", clase.data());
      return clase.data();
    }
    throw new Error("Clase no existe");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 *
 * @param {Object} obj
 * @param {string} obj.idDocente
 */
export async function obtenerDocente({ idDocente }) {
  try {
    const docente = await getDoc(doc(db, "docentes", idDocente));
    if (docente.exists()) {
      return docente.data();
    }
    throw new Error("Docente no existe");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 *
 * @param {Object} obj
 * @param {string} obj.idDocente
 */
export async function obtenerClasesDeDocente({ idDocente }) {
  try {
    const clasesDocente = await getDocs(
      collection(db, "docentes", idDocente, "clases"),
    );
    return clasesDocente.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 *
 * @param {Object<string,string>[]} idsDocente
 */
export async function obtenerClasesDeDocentes(idsDocente) {
  try {
    const todasLasClases = [];
    for (const docente of idsDocente) {
      const clases = await obtenerClasesDeDocente({ idDocente: docente.id });
      const clasesConDocentes = clases.map((clase) => {
        return {
          ...clase,
          nombreDocente: docente.nombre,
          idDocente: docente.id,
        };
      });
      todasLasClases.push(...clasesConDocentes);
    }
    return todasLasClases;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtenerDocentes() {
  try {
    const docentesSnap = await getDocs(collection(db, "docentes"));
    return docentesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtenerIDPeriodoActivo() {
  try {
    const periodos = await getDocs(
      query(collection(db, "periodos"), where("activo", "==", true)),
    );
    if (periodos.empty) {
      return null;
    }
    return periodos.docs[0].id;
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
 * @param {string} clase.escuela
 * @param {Array} clase.plan
 */
export async function agregarClase({
  idDocente,
  nombre,
  horario,
  alumnos,
  escuela,
  plan,
}) {
  try {
    const clasesDocente = collection(db, "docentes", idDocente, "clases");
    // Obtener periodo activo
    const periodos = await getDocs(collection(db, "periodos"));
    const fechaActual = new Date(); // Fecha actual
    const periodoActivo = periodos.docs.find(
      (periodo) =>
        periodo.data().fechaInicio.toDate() <= fechaActual &&
        periodo.data().fechaFin.toDate() >= fechaActual,
    );
    if (!periodoActivo) {
      throw new Error("No hay periodo activo");
    }
    // Asegurarse de que todos los elementos del plan sean fechas
    plan = plan.map((p) => {
      if (p.fecha instanceof Date) return p;
      else {
        console.log(p);
        const [dd, mm, yyyy] = p.fecha.split("/");
        return { ...p, fecha: new Date(`${mm}/${dd}/${yyyy}`) };
      }
    });
    // Crear clase
    const claseRef = await addDoc(clasesDocente, {
      nombre,
      horario,
      alumnos,
      plan,
      escuela,
      totalClases: plan.length,
      idPeriodo: periodoActivo.id,
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
        idDocente: idDocente,
        nombreClase: nombre,
        horario: horario,
        asistencias: 0,
        inasistencias: 0,
        totalClases: plan.length,
      });
    }
    return claseRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 *
 * @param {Object} obj
 * @param {string} obj.idReporte
 */
export async function obtenerReporte({ idReporte }) {
  try {
    const reporte = await getDoc(doc(db, "reportes", idReporte));
    if (reporte.exists()) {
      return reporte.data();
    }
    throw new Error("Reporte no existe");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 *
 * @param {Object<string,string>[]} idsAlumno
 */
export async function obtenerReportesDeAlumnos(idsAlumno) {
  try {
    const todosLosReportes = [];
    for (const alumno of idsAlumno) {
      const reportes = await obtenerReportesDeClase({
        idAlumno: alumno.cedula,
      });
      todosLosReportes.push(...reportes);
    }
    return todosLosReportes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
