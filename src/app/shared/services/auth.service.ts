import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.interface';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.interface';
import { RegisterRequest } from '../models/register-request.interface';
import { PerfilUsuarioResponse } from '../models/PerfilUsuarioResponse.interface';
import { UserValidationRequest } from '../models/userValidationRequest.interface';
import { ReenvioCorreo } from '../models/reenvio-correo.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>('/api/api/login_check', loginRequest);
  }

  comprobarValidacionUsuario(){
    return this.http.get('/api/api/user/validar',{ headers: this.obtenerToken()});
  }

  validarUsuario(token: UserValidationRequest){
    return this.http.post('/api/api/auth/validar',token);
  }

  registroUsuario(request: RegisterRequest){
    return this.http.post('/api/api/auth/registro',request);
  }

  reenviarCorreo(correo: ReenvioCorreo){
    return this.http.post('/api/api/auth/renovar_token', correo);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  getUserProfileInfo(): Observable<PerfilUsuarioResponse>{
    return this.http.get<PerfilUsuarioResponse>('/api/api/user/profile/details',{ headers: this.obtenerToken()});
  }

  editarPerfil(perfil: any){
    return this.http.put('/api/api/user/profile/editar', perfil, { headers: this.obtenerToken()});
  }

  obtenerToken(){
    return new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    })
  }
}
