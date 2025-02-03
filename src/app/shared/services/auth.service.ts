import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { Observable } from 'rxjs';
import { AdminRequest } from '../models/admin-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';

  constructor(private http: HttpClient) {}



  /**
   * Método para hacer login
   */
  login (loginRequest: LoginRequest):Observable<LoginResponse>{
      return this.http.post<LoginResponse>('/api/api/auth/login', loginRequest);
  }

  registroUsuarioAdmin():Observable<LoginResponse>{
    return this.http.get<LoginResponse>('/api/api/auth/registro');
  }

  /**
   * Método para guardar el token
   * @param token
   */
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Método para obtener el token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Método para borrar el token(logout)
   */
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Método para obtener el rol del usuario
   */
  // public obtenerRol(): Observable<string> {
  //   return this.http.get(`${apiUrl}/rol/`, { responseType: 'text' });
  // }
}

