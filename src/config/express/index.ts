import customResponse from '@middlewares/customErrorMiddleware';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

export const expressConfig = ({ port, hostname }: { port: number | string; hostname: string }) => {
  dotenv.config();

  const app = express();

  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ origin: [`${hostname}:${port}`] }));

  app.use(customResponse);

  return app;
};
