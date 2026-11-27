import { randomUUID } from 'node:crypto';
import logger from '../utils/logger.js';

const VALID_ID = /^[\w-]{8,64}$/;

/** Nivel del log según el estado: 5xx error, 4xx aviso, el resto información. */
const levelFor = (status) => (status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info');

/**
 * Observabilidad: asigna un `requestId` a cada petición (o reutiliza un `X-Request-Id` válido recibido),
 * lo devuelve en la cabecera de respuesta y, al terminar, registra método, ruta, estado, duración,
 * usuario y código de error. El frontend muestra ese id en su panel de logs para cruzar ambos lados.
 */
const requestContext = (req, res, next) => {
  const incoming = req.get('X-Request-Id');
  req.id = incoming && VALID_ID.test(incoming) ? incoming : randomUUID();
  res.set('X-Request-Id', req.id);

  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const ms = Math.round(Number(process.hrtime.bigint() - start) / 1e6);
    logger[levelFor(res.statusCode)](`${req.method} ${req.originalUrl} -> ${res.statusCode}`, {
      requestId: req.id,
      ms,
      userId: req.user?.id ?? null,
      ...(res.locals.errorCode && { errorCode: res.locals.errorCode }),
    });
  });
  next();
};

export default requestContext;
