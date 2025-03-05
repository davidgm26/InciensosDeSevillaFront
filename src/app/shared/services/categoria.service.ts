import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl = environment.baseURL


  constructor(
    private http: HttpClient,
  ) { }

  getAllCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.baseUrl+'/api/categoria/all');
  }
}
