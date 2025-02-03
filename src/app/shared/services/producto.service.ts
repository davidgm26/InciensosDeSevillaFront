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

  getInformacionProducto(id:string):Observable <Producto>{
    return this.http.get<Producto>('/api/api/producto/'+ id);
  }
  
  getProductosLimitados():Observable<Producto[]>{
    return this.http.get<Producto[]>('/api/api/producto/limitados');
  }
}
