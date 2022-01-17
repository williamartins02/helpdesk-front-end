import { Injectable } from '@angular/core';
import { Tecnico } from './../models/tecnico';
import { Observable, pipe, Subject, tap } from 'rxjs';


import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';


@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  /*GET PARA DA REFRESH AO ADICIONAR UM USUARIO */
  get refresh$() {
    return this._refresh$;
  }

  /*Serviço para listar por Id*/
  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`)
  }

  /*Serviço para LISTA do banco uma LIST ARRAY de tecnico*/
  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }

  /*Serviço apra CRAIR um tecnico novo.*/
  create(tecnicos: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos`, tecnicos)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  update(tecnicos: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${tecnicos.id}`, tecnicos)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  delete(id: any): Observable<Tecnico>{
    return this.http.delete<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }
}