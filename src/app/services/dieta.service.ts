import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Dieta } from '../models/Dieta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  constructor(private http: HttpClient) { }

    getDietaList(organizacion_id:string):Observable<Dieta[]>{
      return this.http.get<Dieta[]>(`${environment.apiUrl}/dieta/list/`+organizacion_id)
    }

    getDieta(id:string):Observable<Dieta>{
      return this.http.get<Dieta>(`${environment.apiUrl}/dieta/`+id)
    }

    //ver url despues
    getCurrentDieta(id:string):Observable<Dieta>{
      return this.http.get<Dieta>(`${environment.apiUrl}/dieta/hc/`+id)
    }

    newDieta(plantillaDieta:Dieta):Observable<any>{
      return this.http.post(`${environment.apiUrl}/dieta/`, plantillaDieta)
    }

    updateDieta(id:string, plantillaDieta:Dieta):Observable<any>{
      return this.http.put(`${environment.apiUrl}/dieta/`+id, plantillaDieta)
    }

    deleteDieta(id:string):Observable<any>{
      return this.http.delete(`${environment.apiUrl}/dieta/`+id)
    }
}
