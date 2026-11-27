## Qué hace

<!-- Una o dos frases. Un lote por PR (ej. L3 — App, auth y usuarios). -->

## Tarea y requisitos

- Lote: <!-- ID del plan de subida, p. ej. L3 -->
- Códigos de requisito: <!-- RF-xx, RN-xx, RT-Bxx, RT-Fxx -->

## Cómo probarlo

<!-- Pasos para que el revisor lo levante: docker compose up --build, npm run smoke, peticiones de ejemplo. -->

## Evidencia

<!-- Salida de curl / smoke o captura. Lo que no se verificó, dilo explícitamente. -->

## Lista de control

- [ ] La rama parte de `develop` actualizado (`git pull origin develop`) y el PR apunta a `develop`
- [ ] Probado con `docker compose up --build` (o `npm run smoke` contra la API en Docker)
- [ ] `git status` y `git diff --stat` revisados: no hay `.env`, `node_modules/`, `dist/` ni datos de MySQL
- [ ] Solo incluye los archivos de su lote
- [ ] Funciones cortas, constantes en lugar de números mágicos, mensajes en español

## Revisión (la completa el otro integrante)

- Lo levanté en mi máquina: <!-- sí / no -->
- Qué entendí del cambio (2 líneas):
