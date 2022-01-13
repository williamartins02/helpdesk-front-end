import { Injectable } from '@angular/core';
import { Tecnico } from './../models/tecnico';
import { Observable } from 'rxjs';


import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';


@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  /*Serviço para LISTA do banco uma LIST ARRAY de tecnico*/
  findAll(): Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }

  /*Serviço apra CRAIR um tecnico novo.*/
  create(tecnicos: Tecnico): Observable<Tecnico>{
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos`, tecnicos)
  }
}
