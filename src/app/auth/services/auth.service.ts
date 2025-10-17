import { Injectable, computed, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable, tap } from 'rxjs';
import { ConnectedUser } from '../user/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  //////////////////////////////////////////////////////////////
  user = signal<ConnectedUser | null>(null);
  token = signal<string | null>(null);

  isAuthenticated = computed(() => this.token() != null);

  //////////////////////////////////////////////////////////////

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const savedToken = localStorage.getItem('token');
    const savedUserId = Number(localStorage.getItem('userId'));
    const savedUserEmail = localStorage.getItem('userEmail');

    if (savedToken) {
      this.token.set(savedToken);
      this.user.set(
        savedUserId && savedUserEmail
          ? { id: savedUserId, email: savedUserEmail }
          : null
      );
    }
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }
  ///////////////////////////////////////////////////

  loginTest(credentials: CredentialsDto): boolean {
    if (this.verifyCredentials(credentials)) {
      this.token.set('test_token_value');
      this.user.set({ email: credentials.email, id: 1 });
      localStorage.setItem('token', 'test_token_value');
      localStorage.setItem('userId', '1');
      localStorage.setItem('userEmail', credentials.email);
      return true
    }
    return false;
  }

  verifyCredentials(credentials: CredentialsDto): boolean {
    if (
      credentials.email == 'chedli@email.com' &&
      credentials.password == 'azerty'
    ) {
      return true;
    }
    return false;
  }
  //////////////////////////////////////////////////////////////////////////
  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  // logout() {
  //   localStorage.removeItem('token');
  // }
  logout() {
    this.token.set(null);
    this.user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail')
  }
}
