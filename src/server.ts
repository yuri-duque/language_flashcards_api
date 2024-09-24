import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import customResponse from './middlewares/customErrorMiddleware';
import TranslateRouter from './routes/translate';
import ExempleRouter from './routes/exemples';

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOSTNAME = 'http://localhost';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: [`${HOSTNAME}:${PORT}`] }));

app.use(customResponse);

app.use('/api', TranslateRouter);
app.use('/api', ExempleRouter);

app.listen(PORT, () => `server running ${HOSTNAME}:${PORT}`);
