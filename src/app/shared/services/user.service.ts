import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  obtenerToken() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getToken()
    })
  }

  cargarTodosLosUsuarios():Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>("/api/api/user/admin/userlist", { headers: this.obtenerToken() });
  }

  cambiarEstado(id: number){
    return this.http.put("/api/api/user/admin/status/"+id, {} , {headers: this.obtenerToken()});
  }

  editarUsuario(id: number, usuario: UserResponse){
    return this.http.put("/api/api/user/admin/editar/"+id, usuario , {headers: this.obtenerToken()});
  }
}
