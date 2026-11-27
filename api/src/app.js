import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { corsOptions } from './config/cors.config.js';
import router from './routes/index.js';
import notFound from './middlewares/notFound.middleware.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import requestContext from './middlewares/requestContext.middleware.js';

const app = express();

// ─── Global middlewares ──────────────────────────
app.use(requestContext); // primero: también registra peticiones rechazadas por CORS o JSON inválido
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// ─── Routes ──────────────────────────────────────
app.use('/api', router);

// ─── Error handler (must be last) ────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
