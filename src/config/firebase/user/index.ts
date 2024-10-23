import CustomError, { STATUS } from '@utils/customError';
import { auth } from 'firebase-admin';

export class FirebaseUser {
  async createUser(name: string, email: string, password: string, phoneNumber?: string) {
    try {
      const user = await auth().createUser({
        email,
        phoneNumber,
        password,
        displayName: name,
        disabled: false,
      });

      return user;
    } catch (error) {
      throw new CustomError('Error to create user', STATUS.error);
    }
  }

  async updateUser(uid: string, name: string, email: string, phoneNumber?: string) {
    try {
      const user = await auth().updateUser(uid, {
        email,
        phoneNumber,
        displayName: name,
      });
      return user;
    } catch (error) {
      throw new CustomError('Error to update user', STATUS.error);
    }
  }

  async disableUser(uid: string) {
    try {
      const user = await auth().updateUser(uid, {
        disabled: true,
      });
      return user;
    } catch (error) {
      throw new CustomError('Error to disable user', STATUS.error);
    }
  }

  async enableUser(uid: string) {
    try {
      const user = await auth().updateUser(uid, {
        disabled: false,
      });
      return user;
    } catch (error) {
      throw new CustomError('Error to enable user', STATUS.error);
    }
  }

  async listUsers(limit?: number, nextPageToken?: string) {
    try {
      const listUsers = await auth().listUsers(limit || 25, nextPageToken);
      return listUsers;
    } catch (error: any) {
      throw new CustomError(error.message, STATUS.error);
    }
  }
}
