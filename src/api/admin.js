import { doc, getFirestore, setDoc,getDoc } from "firebase/firestore";
import { app } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { escuelas } from "../constants/escuelas";
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
export async function agregarPeriodo({
  nombre,
  fechaInicio,
  fechaFin,
  duracion,
}) {
  try {
    // eslint-disable-next-line no-unused-vars
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

export async function obtenerNombrePeriodo(idPeriodo) {
  try {
    const periodo = await getDoc(
      doc(db, "periodos", idPeriodo)
    );
    if (periodo.exists()) {
    
      return periodo.data().nombre;
    }
    throw new Error("Periodo no existe");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obtenerAsistenciasPeriodo(idPeriodo){
  try{
    let asistencias = 0;
    let inasistencias = 0;
    const periodo = await getDocs(query(collection(db, "asistencias"), where("idPeriodo", "==", idPeriodo)));
    for (const doc of periodo.docs) {
      asistencias +=doc.data().asistentes;
      inasistencias +=doc.data().inasistentes;
    }
    console.log(asistencias);
    console.log(inasistencias);

    if(periodo.empty){
      return null;
    }
    return {asistencias, inasistencias};
  }
  catch (error) {
     console.error(error);
     throw error;
  }
}

export async function obtenerAsistenciasSemanal(idClase){
  
  try{
    
    let informacionSemanal = Array.from({ length: 15 }, (_, i) => ({
      name: (i + 1).toString(),
      "Asistencias ": 0,
      "Inasistencias ": 0,
    }));
    let informacionTotal = [
      { name: "Total" ,
        "Asistencias ":0, 
        "Inasistencias ": 0 },
    ];
    const periodo = await getDocs(query(collection(db, "asistencias"), where("idClase", "==", idClase)));
    for (const doc of periodo.docs) {
      informacionSemanal[doc.data().semana-1]["Asistencias "] =doc.data().asistentes;
      informacionSemanal[doc.data().semana-1]["Inasistencias "]=doc.data().inasistentes;
      informacionTotal[0]["Asistencias "] +=doc.data().asistentes;
      informacionTotal[0]["Inasistencias "]+=doc.data().inasistentes;
    }

    return {informacionSemanal, informacionTotal};
  }
  catch (error) {
     console.error(error);
     throw error;
  }
}

export async function obtenerAsistenciasEscuelas(){
  try {
    const escuelasInfo = escuelas.map(escuela => ({
      name: escuela,
      "Asistencias ": 0,
      "Inasistencias ": 0,
    }));
    const escuelasDocumentos = await getDocs(
      query(collection(db, "asistencias"))
    );
    console.log("elpepe",escuelasDocumentos.docs)
    for(const doc of escuelasDocumentos.docs){
  if(doc.data().escuela != undefined){
    console.log("etesech",doc.data());
    const escuelaInfo = escuelasInfo.find(e => e.name === doc.data().escuela);
    if (escuelaInfo) {
      escuelaInfo["Asistencias "] += doc.data().asistentes;
      escuelaInfo["Inasistencias "] += doc.data().inasistentes;
      console.log(escuelaInfo["Asistencias "] );
      console.log(escuelaInfo["Inasistencias "]);
    }
  }
}

    console.log("tilinazo",escuelasInfo);

    return escuelasInfo;


    
  
  } catch (error) {
    console.error(error);
    throw error;
  }

}
