import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable, pipe, Subject, tap } from 'rxjs';


import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  /*GET PARA DA REFRESH AO ADICIONAR UM USUARIO */
  get refresh$() {
    return this._refresh$;
  }

  /*Serviço para listar por Id*/
  findById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`)
  }

  /*Serviço para LISTA do banco uma LIST ARRAY de cliente*/
  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`);
  }

  /*Serviço pra CRAIR um cliente novo.*/
  create(clientes: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, clientes)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  update(clientes: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${clientes.id}`, clientes)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  delete(id: any): Observable<Cliente>{
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }
}