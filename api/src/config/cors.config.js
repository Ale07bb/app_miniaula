import { ENV } from './env.config.js';

/** RT-B06: solo el origen del frontend configurado recibe cabeceras CORS. */
export const corsOptions = {
  origin: ENV.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
  // El frontend lee el id de cada petición para mostrarlo en su panel de logs.
  exposedHeaders: ['X-Request-Id'],
};
