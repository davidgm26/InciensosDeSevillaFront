import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseUrl = environment.baseURL


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
    return this.http.get<any>(this.baseUrl+'/api/pedido/usuario/all', { headers: this.obtenerToken() });
  }
}
