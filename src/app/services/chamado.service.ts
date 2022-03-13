import { API_CONFIG } from "./../config/api.config";
import { Chamado } from "./../models/chamado";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChamadoService {
  private _refresh$ = new Subject<void>();
  
  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`);
  }

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
  }

  create(chamados: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, chamados)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  update(chamados: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${API_CONFIG.baseUrl}/chamados/${chamados.id}`, chamados)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
}
