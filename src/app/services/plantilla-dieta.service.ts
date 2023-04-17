import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlantillaDieta } from '../models/PlantillaDieta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantillaDietaService {

  constructor(private http: HttpClient) { }

    getPlantillaDietaList(organizacion_id:string):Observable<PlantillaDieta[]>{
      return this.http.get<PlantillaDieta[]>(`${environment.apiUrl}/plantilla_dieta/list/`+organizacion_id)
    }

    getPlantillaDieta(id:string):Observable<PlantillaDieta>{
      return this.http.get<PlantillaDieta>(`${environment.apiUrl}/plantilla_dieta/`+id)
    }

    newPlantillaDieta(plantillaDieta:PlantillaDieta):Observable<any>{
      return this.http.post(`${environment.apiUrl}/plantilla_dieta/`, plantillaDieta)
    }

    updatePlantillaDieta(id:string, plantillaDieta:PlantillaDieta):Observable<any>{
      return this.http.put(`${environment.apiUrl}/plantilla_dieta/`+id, plantillaDieta)
    }

    deletePlantillaDieta(id:string):Observable<any>{
      return this.http.delete(`${environment.apiUrl}/plantilla_dieta/`+id)
    }

}
