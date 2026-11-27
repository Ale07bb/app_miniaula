// Traduce los issues de Zod al formato de `details` de la API: "campo: mensaje" (RT-B05).
// Único lugar que lo hace: lo usan schemaValidate (validación normal) y errorHandler (respaldo).

const UNKNOWN_FIELD = 'Campo no permitido';

const withPath = (path, message) => (path.length ? `${path.join('.')}: ${message}` : message);

/**
 * Convierte un issue en uno o más textos. `.strict()` produce `unrecognized_keys` con varias claves en un solo
 * issue y un mensaje en inglés; se devuelve una línea en español por clave para que el cliente la ubique.
 */
const formatIssue = (issue) =>
  issue.code === 'unrecognized_keys'
    ? issue.keys.map((key) => withPath([...issue.path, key], UNKNOWN_FIELD))
    : [withPath(issue.path, issue.message)];

/** Lista de `details` a partir de los issues de un ZodError. */
export const formatZodIssues = (issues) => issues.flatMap(formatIssue);
