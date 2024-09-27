import { FirebaseAuth } from '../../config/Firebase/auth';

export class AuthService {
  private readonly firebaseAuth: FirebaseAuth;

  constructor() {
    this.firebaseAuth = new FirebaseAuth();
  }

  async verifyToken(token: string) {
    return this.firebaseAuth.verifyToken(token);
  }

  async createCustomToken(uid: string) {
    return this.firebaseAuth.createCustomToken(uid);
  }
}
