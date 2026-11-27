import bcrypt from 'bcryptjs';
import { sequelize, Usuario, Curso, Leccion, Pregunta } from '../models/index.js';
import { ESTADOS_CURSO, TIPOS_LECCION, NOTA_MINIMA_DEFAULT } from '../constants/index.js';
import logger from '../utils/logger.js';
import { PASSWORD_DEMO, USUARIOS, CURSOS } from './seedData.js';

/** Las lecciones de video van primero, en su orden; la evaluación final cierra el curso (RN-01 la bloquea hasta entonces). */
const leccionesDe = ({ titulo, lecciones }) => [
  ...lecciones.map((l, i) => ({ ...l, tipo: TIPOS_LECCION.CONTENIDO, orden: i + 1 })),
  { titulo: `Evaluación final: ${titulo}`, tipo: TIPOS_LECCION.CUESTIONARIO, notaMinima: NOTA_MINIMA_DEFAULT, orden: lecciones.length + 1 },
];

async function crearUsuarios(transaction) {
  const passwordHash = await bcrypt.hash(PASSWORD_DEMO, 10);
  const usuarios = await Usuario.bulkCreate(USUARIOS.map((u) => ({ ...u, passwordHash })), { transaction });
  return Object.fromEntries(usuarios.map((u) => [u.email, u]));
}

async function crearCurso({ instructor, lecciones, evaluacion, ...datos }, instructorId, transaction) {
  const curso = await Curso.create({ ...datos, estado: ESTADOS_CURSO.PUBLICADO, instructorId }, { transaction });
  const creadas = await Leccion.bulkCreate(
    leccionesDe({ titulo: datos.titulo, lecciones }).map((l) => ({ ...l, cursoId: curso.id })),
    { transaction, validate: true },
  );
  const cuestionario = creadas.find((l) => l.tipo === TIPOS_LECCION.CUESTIONARIO);
  await Pregunta.bulkCreate(evaluacion.map((p) => ({ ...p, leccionId: cuestionario.id })), { transaction, validate: true });
}

/** RT-B08/RT-B11: seed idempotente; si ya existen usuarios no hace nada. No crea inscripciones. */
async function seed() {
  try {
    await sequelize.authenticate();
    if ((await Usuario.count()) > 0) {
      logger.info('Seed ya aplicado: se omite');
      process.exit(0);
    }
    await sequelize.transaction(async (transaction) => {
      const usuarios = await crearUsuarios(transaction);
      for (const curso of CURSOS) await crearCurso(curso, usuarios[curso.instructor].id, transaction);
    });
    logger.info('Seed ejecutado correctamente', { cursos: CURSOS.length, usuarios: USUARIOS.length });
    process.exit(0);
  } catch (error) {
    logger.error('Error durante el seed', { err: error });
    process.exit(1);
  }
}

seed();
