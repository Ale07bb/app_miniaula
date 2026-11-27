import { pathToFileURL } from 'node:url';
import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from '../config/db.config.js';
import logger from '../utils/logger.js';

/** ADR-04 / RT-B08: migraciones versionadas (Umzug); la tabla SequelizeMeta evita repetirlas. */
const umzug = new Umzug({
  migrations: {
    glob: ['migrations/*.js', { cwd: import.meta.dirname }],
    // Las migraciones son módulos ES: se cargan con import() dinámico, no con require().
    resolve: ({ name, path, context }) => ({
      name,
      up: async () => (await import(pathToFileURL(path).href)).up({ context }),
      down: async () => (await import(pathToFileURL(path).href)).down({ context }),
    }),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: {
    info: (event) => logger.info('Migración', event),
    warn: (event) => logger.warn('Migración', event),
    error: (event) => logger.error('Migración', event),
    debug: () => {},
  },
});

async function migrate() {
  try {
    await sequelize.authenticate();
    logger.info('Migraciones: conexión a la base de datos establecida');
    await umzug.up();
    logger.info('Migraciones al día');
    process.exit(0);
  } catch (error) {
    logger.error('Error durante la migración', { err: error });
    process.exit(1);
  }
}

migrate();
