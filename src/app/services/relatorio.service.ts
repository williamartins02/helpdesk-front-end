import { API_CONFIG } from "./../config/api.config";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Report } from "../models/report";


@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) { }

 // downloadPdfRelatorio() {
    //return this.http.get(`${API_CONFIG.baseUrl}/relatorios/${'data.text'}`, { responseType: 'text' }).subscribe((data) => {
        //document.querySelector('iframe').src = data;
      //});
  //}

    downloadPdfRelatorioParam(userReport:Report) {
      return this.http.post(`${API_CONFIG.baseUrl}/relatorios/${'data.text'}`,userReport, { responseType: 'text' }).subscribe((data) => {
          document.querySelector('iframe').src = data;
        });
    }
}
