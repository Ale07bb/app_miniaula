# AGENTS.md — database/

Esquema de la BD y datos de prueba (RT-B08).

## Estado actual

- `migrate.js` ejecuta las migraciones de `migrations/` con **Umzug** (ADR-04); se cargan con `import()` porque son módulos ES.
  La primera, `202611160900-crear-tablas-base.js`, crea las 6 tablas, FKs e índices únicos. No hay `sync()` en ningún sitio.
- `seedData.js` (datos: usuarios, 6 cursos, lecciones con video y preguntas) y `seed.js` (lógica) crean 2 instructores, 3 estudiantes y
  6 cursos **publicados** (3 por docente) de 4 lecciones con video + 1 evaluación final de 4 preguntas, en una transacción. **Sin inscripciones.**

## Reglas para migraciones (a partir de B1-04)

- Una migración por cambio, nombre `AAAAMMDDHHmm-<descripcion>.js`, con `up` y `down`.
- Nunca editar una migración ya aplicada en otra máquina: crear una nueva.
- Las tablas, FKs (`RESTRICT`/`CASCADE`) e índices únicos deben coincidir con `models/`.
- El contenedor de la API ejecuta migraciones antes de arrancar (Dockerfile / compose).

## Reglas para el seed

- Idempotente: si ya hay datos, no duplica (hoy: si existe algún usuario, sale).
- Mínimo del PDF: 2 instructores, 3 estudiantes, **3 cursos publicados**, 5 lecciones cada uno, ≥1 cuestionario por curso.
- Datos de demo: sin temas ni respuestas repetidos entre cursos; videos en español de ≤ 5 min (verificados con `yt.py`); los estudiantes
  del seed no se inscriben (las pruebas automáticas usan cuentas propias).
- Contraseñas con `bcrypt`. Las credenciales de prueba se documentan en el README (no son secretos).
- Datos pensados para la demo de la defensa: preguntas con respuestas razonables y un cuestionario que se pueda
  reprobar y luego aprobar.
- Nada de `force: true` contra una BD con datos sin avisar al usuario.
