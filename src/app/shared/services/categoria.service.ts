import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>('/api/api/categoria/all');
  }
}
