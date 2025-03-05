import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.interface';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.interface';
import { RegisterRequest } from '../models/register-request.interface';
import { PerfilUsuarioResponse } from '../models/PerfilUsuarioResponse.interface';
import { UserValidationRequest } from '../models/userValidationRequest.interface';
import { ReenvioCorreo } from '../models/reenvio-correo.interface';
import { UserResponse } from '../models/user-response.interface';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseURL

  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + '/api/login_check', loginRequest).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);

          try {
            const tokenParts = response.token.split('.');
            if (tokenParts.length === 3) {
              const payload = JSON.parse(atob(tokenParts[1]));
              if (payload && payload.role) {
                sessionStorage.setItem('rol', payload.role);
              }
            }
          } catch (error) {
            console.error('Error al decodificar el token:', error);
          }
        }
      })
    );
  }

  comprobarValidacionUsuario() {
    return this.http.get(this.baseUrl + '/api/user/validar', { headers: this.obtenerToken() });
  }

  validarUsuario(token: UserValidationRequest) {
    return this.http.post(this.baseUrl + '/api/auth/validar', token);
  }

  registroUsuario(request: RegisterRequest) {
    return this.http.post(this.baseUrl + '/api/auth/registro', request);
  }

  reenviarCorreo(correo: ReenvioCorreo) {
    return this.http.post(this.baseUrl + '/api/auth/renovar_token', correo);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem('rol');
  }

  getUserProfileInfo(): Observable<PerfilUsuarioResponse> {
    return this.http.get<PerfilUsuarioResponse>(this.baseUrl + '/api/user/profile/details', { headers: this.obtenerToken() });
  }

  editarPerfil(perfil: any) {
    return this.http.put(this.baseUrl + '/api/user/profile/editar', perfil, { headers: this.obtenerToken() });
  }

  obtenerToken() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    })
  }

  obtenerUsuario(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseUrl + '/api/user/me', { headers: this.obtenerToken() });
  }
  esAdmin(): boolean {
    console.log(this.obtenerRolUsuario());
  
    return this.obtenerRolUsuario() === 'ROLE_ADMIN';
  }

estaActivo(): Observable < boolean > {
  return this.obtenerUsuario().pipe(
    map(resp => {
      return resp.activo;
    })
  );
}

obtenerRolUsuario(): string | null {
  try {
    const token = this.getToken();
    if (!token) return null;

    // Decodificar el token JWT para obtener el payload
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return null;

    const payload = JSON.parse(atob(tokenParts[1]));

    // Extraer el rol del payload
    if (payload && payload.roles) {
      return payload.roles[0];
    }

    return null;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
}
}
