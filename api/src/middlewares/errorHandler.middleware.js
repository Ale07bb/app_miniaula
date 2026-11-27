import AppError from '../errors/AppError.js';
import logger from '../utils/logger.js';
import { formatZodIssues } from '../utils/zodIssues.js';

const respond = (res, status, code, message, details = null) => {
  res.locals.errorCode = code; // requestContext lo añade al log de la petición
  return res.status(status).json({ error: { code, message, details } });
};

const isMalformedJson = (err) => err.type === 'entity.parse.failed';
const isTooLarge = (err) => err.type === 'entity.too.large';
const isDuplicate = (err) => err.name === 'SequelizeUniqueConstraintError';
const isForeignKey = (err) => err.name === 'SequelizeForeignKeyConstraintError';

/** RT-B05: único punto que decide el formato { error: { code, message, details } }; nunca expone el stack. */
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) return respond(res, err.statusCode, err.code, err.message, err.details);
  if (err.issues) return respond(res, 400, 'VALIDATION_ERROR', 'Datos de entrada inválidos', formatZodIssues(err.issues));
  if (isMalformedJson(err)) return respond(res, 400, 'INVALID_JSON', 'El cuerpo de la petición no es un JSON válido');
  if (isTooLarge(err)) return respond(res, 413, 'PAYLOAD_TOO_LARGE', 'El cuerpo de la petición es demasiado grande');
  if (isDuplicate(err)) return respond(res, 409, 'DUPLICATE_ENTRY', 'Ya existe un registro con esos datos');
  if (isForeignKey(err)) return respond(res, 409, 'RELATED_RECORDS', 'La operación entra en conflicto con registros relacionados');

  logger.error('Error no controlado', { requestId: req.id, method: req.method, url: req.originalUrl, err });
  return respond(res, 500, 'INTERNAL_ERROR', 'Error interno del servidor');
};

export default errorHandler;
