# app_miniaula - API REST de MiniAula

API REST de una plataforma de cursos cortos (Node.js, Express, Sequelize, MySQL, Docker).

## Requisitos

- Docker Desktop
- Node.js 22 (solo para ejecutar la API fuera de Docker)

## Cómo levantar

```bash
docker compose up --build
```

- API: http://localhost:3000/api
- MySQL: puerto 3306 del host (cambiar con `DB_HOST_PORT` en `.env`)

Sin `.env` se usan valores de desarrollo. Para cambiarlos, copiar `.env.example` a `.env`.
