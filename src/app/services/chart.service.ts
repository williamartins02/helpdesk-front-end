import { UserChart } from './../models/chart';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  
  constructor(private http: HttpClient) { }

  carregarGrafico(): Observable<any>{
    return this.http.get<any>(`${API_CONFIG.baseUrl}/relatorios/grafico`);
  }
}
