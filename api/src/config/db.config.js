import { Sequelize } from 'sequelize';
import { ENV } from './env.config.js';
import logger from '../utils/logger.js';

const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  dialect: 'mysql',
  // SQL solo con LOG_LEVEL=debug, para no inundar los logs.
  logging: ENV.LOG_LEVEL === 'debug' ? (sql) => logger.debug(sql) : false,
  define: {
    timestamps: false,
    underscored: false,
  },
});

export default sequelize;
