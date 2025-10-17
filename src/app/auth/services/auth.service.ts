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
user = signal<ConnectedUser|null>(null)
token = signal<string|null>(null)

isAuthenticated = computed(()=>!!this.token)


  













//////////////////////////////////////////////////////////////





  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const savedToken = localStorage.getItem('token');
    const savedUserId = Number(localStorage.getItem('userId'));
    const savedUserEmail = localStorage.getItem('userEmail');

    if (savedToken) {
      this.token.set(savedToken);
      this.user.set(savedUserId && savedUserEmail ? {id:savedUserId,email:savedUserEmail} : null);
    }
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }
  ///////////////////////////////////////////////////
  loginTest(credentials:CredentialsDto): Observable<LoginResponseDto>{
     return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        this.token.set(response.id);
        this.user.set({email:credentials.email,id:response.userId})

        localStorage.setItem('token', response.id);
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('userEmail', credentials.email);
      })
    );
    
  }
//////////////////////////////////////////////////////////////////////////
  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  logout() {
    localStorage.removeItem('token');
  }
  logoutTest() {
    this.token.set(null);
    this.user.set(null);
    localStorage.clear();
  }
}
