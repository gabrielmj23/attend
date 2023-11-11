import readXlsxFile from "read-excel-file";

const horarioSchema = {
  Día: {
    prop: "dia",
    type: String,
  },
  "Hora Inicio": {
    prop: "horaInicio",
    type: (value) => String(value),
  },
  "Hora Fin": {
    prop: "horaFin",
    type: (value) => String(value),
  },
};

const alumnosSchema = {
  Cédula: {
    prop: "cedula",
    type: String,
  },
  Nombre: {
    prop: "nombre",
    type: String,
  },
};

const planSchema = {
  Semana: {
    prop: "semana",
    type: Number,
  },
  Fecha: {
    prop: "fecha",
    type: Date,
  },
  Tema: {
    prop: "tema",
    type: String,
  },
};

const schemas = {
  horario: horarioSchema,
  alumnos: alumnosSchema,
  plan: planSchema,
};

/**
 *
 * @param {File} archivo
 * @param {string} tipo - "horario", "alumnos" o "plan"
 */
export async function parseArchivo(archivo, tipo) {
  const { rows, errors } = await readXlsxFile(archivo, {
    schema: schemas[tipo],
  });
  if (errors.length > 0) {
    console.error(errors);
    throw new Error("Error al leer el archivo");
  }
  return rows;
}
