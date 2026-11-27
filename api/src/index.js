import app from './app.js';
import { ENV } from './config/env.config.js';
import { sequelize } from './models/index.js';
import logger from './utils/logger.js';

// Errores fuera de una petición: se registran con su stack (Docker reinicia el contenedor si el proceso sale).
process.on('unhandledRejection', (reason) => logger.error('Promesa rechazada sin manejar', { err: reason }));
process.on('uncaughtException', (err) => {
  logger.error('Excepción no capturada', { err });
  process.exit(1);
});

async function start() {
  try {
    await sequelize.authenticate();
    logger.info('Conexión a la base de datos establecida', { host: ENV.DB_HOST, db: ENV.DB_NAME });

    app.listen(ENV.PORT, () => {
      logger.info(`Servidor escuchando en el puerto ${ENV.PORT}`, {
        env: ENV.NODE_ENV,
        logLevel: ENV.LOG_LEVEL,
        corsOrigin: ENV.CORS_ORIGIN,
      });
    });
  } catch (error) {
    logger.error('No se pudo iniciar el servidor', { err: error });
    process.exit(1);
  }
}

start();
