import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resenia } from '../models/resenia.interface';
import { AuthService } from './auth.service';
import { ReseniaResponse } from '../models/resenia-response.interface';

@Injectable({
    providedIn: 'root'
})
export class ReseniaService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    obtenerToken() {
        return new HttpHeaders({
            Authorization: 'Bearer ' + this.authService.getToken()
        })
    }

    obtenerReseniasDeUnUsuario(): Observable<ReseniaResponse[]> {
        return this.http.get<ReseniaResponse[]>("/api/api/user/resenias", { headers: this.obtenerToken() });
    }

    eliminarResenia(id: number){
        return this.http.delete("/api/api/user/borrar/resenia/"+id, { headers: this.obtenerToken() });
    }
}
