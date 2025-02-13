import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { Resenia } from '../models/resenia';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient,
  ) { }

  obtenerToken(){
      return new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
      
    }


  getAllProductosByCategoria(id:string):Observable <Producto[]>{
    return this.http.get<Producto[]>('/api/api/producto/categoria/'+ id);
  }

  getAllProductos():Observable <Producto[]>{
    return this.http.get<Producto[]>('/api/api/producto/all');
  }

  getAllProductosActivos(id:string):Observable <Producto[]>{
    return this.http.get<Producto[]>('/api/api/producto/all/activos/categoria/'+ id);
  }

  getInformacionProducto(id:string):Observable <Producto>{
    return this.http.get<Producto>('/api/api/producto/'+ id);
  }
  
  getProductosLimitados():Observable<Producto[]>{
    return this.http.get<Producto[]>('/api/api/producto/limitados');
  }

  updateProducto(id:string, producto:Producto):Observable<Producto>{
    return this.http.put<Producto>('/api/api/producto/editar/'+id, producto);
  }

  cambiarVisibilidad(id: string):Observable<Producto>{
    return this.http.put<Producto>('/api/api/producto/status/'+id, {});
  }

  deleteProducto(id:number):Observable<any>{
    return this.http.delete('/api/api/producto/'+ id);
  }

  getResenias(id:string):Observable<Resenia[]>{
    return this.http.get<Resenia[]>('/api/api/producto/resenias/'+ id);
  }

  addResenia(id:string, resenia:Resenia):Observable<Resenia>{
    debugger;
    return this.http.post<Resenia>('/api/api/producto/resenia/new/'+ id, resenia , {headers: this.obtenerToken()});
  }

}
