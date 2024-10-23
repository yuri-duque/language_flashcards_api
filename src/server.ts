import dotenv from 'dotenv';
import { languageRouter, userRouter } from './routes';
import { firebaseConfig } from './config/firebase';
import { expressConfig } from './config/express';

try {
  dotenv.config();

  const PORT = process.env.PORT || 4000;
  const HOSTNAME = 'http://localhost';

  firebaseConfig();

  const app = expressConfig({ port: PORT, hostname: HOSTNAME });

  app.use('/api', languageRouter);
  app.use('/api', userRouter);

  app.listen(PORT, () => `server running ${HOSTNAME}:${PORT}`);
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
} catch (error) {
  console.log('Error on server initialization', error);
}
