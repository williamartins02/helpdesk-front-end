import { Telefone } from "./../models/telefone";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { Observable, pipe, Subject, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TelefoneService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  findById(id: any): Observable<Telefone[]> {
    return this.http.get<Telefone[]>(`${API_CONFIG.baseUrl}/telefones/${id}`);
  }

  findByTelefoneId(id: Number): Observable<Telefone> {
    return this.http.get<Telefone>(`${API_CONFIG.baseUrl}/telefones/id/${id}`);
  }

  findAll(): Observable<Telefone[]> {
    return this.http.get<Telefone[]>(`${API_CONFIG.baseUrl}/telefones`);
  }

  create(telefones: Telefone): Observable<Telefone> {
    return this.http.post<Telefone>(`${API_CONFIG.baseUrl}/telefones`, telefones)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  update(telefones: Telefone): Observable<Telefone> {
    return this.http.put<Telefone>(`${API_CONFIG.baseUrl}/telefones/${telefones.id}`, telefones)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  delete(id: any): Observable<Telefone>{
    return this.http.delete<Telefone>(`${API_CONFIG.baseUrl}/telefones/${id}`)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }
}
