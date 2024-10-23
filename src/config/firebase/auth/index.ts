import CustomError, { STATUS } from '@utils/customError';
import { auth } from 'firebase-admin';

export class FirebaseAuth {
  async verifyToken(token: string) {
    try {
      const decodedToken = await auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new CustomError('Error to decode token', STATUS.error);
    }
  }

  async createCustomToken(uid: string) {
    try {
      const customToken = await auth().createCustomToken(uid);
      return customToken;
    } catch (error) {
      throw new CustomError('Error to create custom token', STATUS.error);
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const newToken = await auth().createCustomToken(refreshToken);
      return newToken;
    } catch (error) {
      throw new CustomError('Error to refresh token', STATUS.error);
    }
  }
}
