import { AuthDataSource } from '@/src/data/dataSource/auth/authDataSource';
import { AuthRemote } from '@/src/data/dataSource/auth/remotes/authRemote';
import { AuthRepository } from './authRepository';

export class authRepositoryImpl implements AuthRepository {
  private remoteDataSource: AuthRemote;

  constructor(_remoteDataSource: AuthDataSource) {
    this.remoteDataSource = _remoteDataSource as AuthRemote;
  }

  signInWithGoogleProvider(): void {
    this.remoteDataSource.signInWithGoogleProvider!();
  }
}
