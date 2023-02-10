import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consulta } from '../models/Consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  getConsultas(id:string):Observable<Consulta[]>{
    return this.http.get<Consulta[]>(`${environment.apiUrl}/historia_clinica/`+id+`/consultas`)
  }

  newConsultas(consulta:Consulta, id:string):Observable<any>{
    return this.http.post(`${environment.apiUrl}/historia_clinica/`+id+`/consultas`, consulta)
  }

  getConsulta(id:string, id_consulta:string):Observable<Consulta>{
    return this.http.get<Consulta>(`${environment.apiUrl}/historia_clinica/`+id+`/consultas/`+id_consulta)
  }

}
