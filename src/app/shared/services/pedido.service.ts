import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  obtenerToken() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getToken()
    })
  }

  getAllPedidosDeUsuario(): Observable<any> {
    return this.http.get<any>('/api/api/pedido/usuario/all', { headers: this.obtenerToken() });
  }
}
