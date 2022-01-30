import { API_CONFIG } from "./../config/api.config";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) { }

  downloadPdfRelatorio() {
    return this.http.get(`${API_CONFIG.baseUrl}/relatorios/${'data.text'}`, { responseType: 'text' }).subscribe((data) => {
        document.querySelector('iframe').src = data;
      });
  }

 // downloadPdfRelatorio(): Observable<any> {
    //return this.http.get<any>(`${API_CONFIG.baseUrl}/relatorios`);
  //}
}
