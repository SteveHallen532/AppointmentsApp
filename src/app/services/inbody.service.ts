import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inbody } from '../models/inbody';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InbodyService {

  constructor(private http:HttpClient) { }

  getInbodyList(hc_id:string):Observable<Inbody[]>{
    return this.http.get<Inbody[]>(`${environment.apiUrl}/historia_clinica/`+hc_id+`/inbody`)
  }

  saveInbody(inbody:Inbody):Observable<any> {
    return this.http.post<Inbody>(`${environment.apiUrl}/historia_clinica/inbody`, inbody)
  }

  deleteInbody(id:string):Observable<any> {
    return this.http.delete(`${environment.apiUrl}/historia_clinica/inbody/`+id)
  }

}
