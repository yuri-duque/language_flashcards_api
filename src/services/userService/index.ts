import { FirebaseAuth } from '@config/firebase/auth';

export class UserService {
  private readonly firebaseAuth: FirebaseAuth;

  constructor() {
    this.firebaseAuth = new FirebaseAuth();
  }

  async createUser(name: string, email: string, password: string, phoneNumber?: string) {
    return this.firebaseAuth.createUser(name, email, password, phoneNumber);
  }

  async updateUser(uid: string, name: string, email: string, phoneNumber?: string) {
    return this.firebaseAuth.updateUser(uid, name, email, phoneNumber);
  }

  async disableUser(uid: string) {
    return this.firebaseAuth.disableUser(uid);
  }

  async enableUser(uid: string) {
    return this.firebaseAuth.enableUser(uid);
  }

  async listUsers(limit?: number, nextPageToken?: string) {
    return this.firebaseAuth.listUsers(limit, nextPageToken);
  }
}
