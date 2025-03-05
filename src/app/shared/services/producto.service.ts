import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../models/producto.interface';
import { Observable } from 'rxjs';
import { Resenia } from '../models/resenia.interface';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  baseUrl = environment.baseURL


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  obtenerToken(){
      return new HttpHeaders({
        Authorization: 'Bearer ' + this.authService.getToken()})
      }
      

  getAllProductosByCategoria(id:string):Observable <Producto[]>{
    return this.http.get<Producto[]>(this.baseUrl+'/api/producto/categoria/'+ id);
  }

  getAllProductos():Observable <Producto[]>{
    return this.http.get<Producto[]>(this.baseUrl+'/api/producto/all');
  }

  getAllProductosActivos(id:string):Observable <Producto[]>{
    return this.http.get<Producto[]>(this.baseUrl+'/api/producto/all/activos/categoria/'+ id);
  }

  getInformacionProducto(id:string):Observable <Producto>{
    return this.http.get<Producto>(this.baseUrl+'/api/producto/'+ id);
  }
  
  getProductosLimitados():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.baseUrl+'/api/producto/limitados');
  }

  updateProducto(id:string, producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(this.baseUrl+'/api/producto/editar/'+id, producto);
  }

  cambiarVisibilidad(id: string):Observable<Producto>{
    return this.http.put<Producto>(this.baseUrl+'/api/producto/status/'+id, {});
  }

  deleteProducto(id:number):Observable<any>{
    return this.http.delete(this.baseUrl+'/api/producto/'+ id);
  }

  getResenias(id:string):Observable<Resenia[]>{
    return this.http.get<Resenia[]>(this.baseUrl+'/api/producto/resenias/'+ id);
  }

  addResenia(id:string, resenia:Resenia):Observable<Resenia>{
    return this.http.post<Resenia>(this.baseUrl+'/api/producto/resenia/new/'+ id, resenia , {headers: this.obtenerToken()});
  }

}
