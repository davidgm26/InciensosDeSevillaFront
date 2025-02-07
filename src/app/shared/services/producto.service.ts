import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient,
  ) { }


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
}
