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
//como guardo la url de los archivos en un modelo de Inbody
  getInbodyList(hc_id:string):Observable<Inbody[]>{
    return this.http.get<Inbody[]>(`${environment.apiUrl}//`+hc_id+`/list`)
  }

}
