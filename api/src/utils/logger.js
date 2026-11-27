// Logger único de la API (observabilidad). Sin dependencias: escribe en stdout/stderr, que Docker recoge
// (`docker compose logs -f api`). Producción → una línea JSON por evento; desarrollo → una línea legible.
// Nunca registrar contraseñas, tokens ni el cuerpo completo de una petición.
import { ENV } from '../config/env.config.js';

const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 };
const minLevel = LEVELS[ENV.LOG_LEVEL] ?? LEVELS.info;
const useJson = ENV.LOG_FORMAT === 'json';

const ICONS = { debug: '·', info: 'i', warn: '!', error: 'x' };

/** Convierte un Error en un objeto serializable (el stack solo va al log, nunca a la respuesta HTTP). */
const serializeError = (err) => (err instanceof Error ? { name: err.name, message: err.message, stack: err.stack } : err);

const formatPretty = (level, message, context) => {
  const time = new Date().toISOString().slice(11, 23);
  const { err, ...rest } = context;
  const extra = Object.keys(rest).length ? ` ${JSON.stringify(rest)}` : '';
  const stack = err?.stack ? `\n${err.stack}` : err ? ` ${JSON.stringify(err)}` : '';
  return `${time} ${ICONS[level]} ${level.toUpperCase().padEnd(5)} ${message}${extra}${stack}`;
};

const write = (level, message, context = {}) => {
  if (LEVELS[level] < minLevel) return;
  const ctx = context.err ? { ...context, err: serializeError(context.err) } : context;
  const line = useJson
    ? JSON.stringify({ time: new Date().toISOString(), level, message, ...ctx })
    : formatPretty(level, message, ctx);
  const stream = LEVELS[level] >= LEVELS.warn ? process.stderr : process.stdout;
  stream.write(`${line}\n`);
};

export const logger = {
  debug: (message, context) => write('debug', message, context),
  info: (message, context) => write('info', message, context),
  warn: (message, context) => write('warn', message, context),
  error: (message, context) => write('error', message, context),
};

export default logger;
