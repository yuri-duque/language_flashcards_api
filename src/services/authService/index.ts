import { FirebaseAuth } from '@config/firebase/auth';

export class AuthService {
  private readonly firebaseAuth: FirebaseAuth;

  constructor() {
    this.firebaseAuth = new FirebaseAuth();
  }

  async refreshToken(refreshToken: string) {
    return this.firebaseAuth.refreshToken(refreshToken);
  }
}
