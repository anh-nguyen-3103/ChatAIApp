import { AuthDataSource } from '../authDataSource';

export class AuthRemote implements AuthDataSource {
  constructor() {}

  signInWithGoogleProvider?: () => {};
}
