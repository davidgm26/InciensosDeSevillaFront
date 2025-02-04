import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { RegisterRequest } from '../models/register-request';

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
      return this.http.post<LoginResponse>('/api/api/login_check', loginRequest);
  }

  registroUsuario(request: RegisterRequest){
    return this.http.post('/api/api/auth/registro',request);
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

