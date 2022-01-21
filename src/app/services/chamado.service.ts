import { API_CONFIG } from "./../config/api.config";
import { Chamado } from "./../models/chamado";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pipe, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ChamadoService {

  constructor( private http: HttpClient) {}

   private _refresh$ = new Subject<void>();

    get refresh$() {
      return this._refresh$;
    }
  

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
  }

  create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, chamado)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

}
