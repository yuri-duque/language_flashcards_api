import { FirebaseUser } from '../../config/Firebase/user';

export class UserService {
  private readonly firebaseUser: FirebaseUser;

  constructor() {
    this.firebaseUser = new FirebaseUser();
  }

  async createUser(name: string, email: string, password: string, phoneNumber?: string) {
    return this.firebaseUser.createUser(name, email, password, phoneNumber);
  }

  async updateUser(uid: string, name: string, email: string, phoneNumber?: string) {
    return this.firebaseUser.updateUser(uid, name, email, phoneNumber);
  }

  async disableUser(uid: string) {
    return this.firebaseUser.disableUser(uid);
  }

  async enableUser(uid: string) {
    return this.firebaseUser.enableUser(uid);
  }

  async listUsers(limit?: number, nextPageToken?: string) {
    return this.firebaseUser.listUsers(limit, nextPageToken);
  }
}
