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

  
// GET 	...api/dieta/:id	                            Dieta
// GET 	...api/dieta/historia_clinica/:id/list		    Dieta[]
// GET 	...api/dieta/historia_clinica/:id/current 		Dieta[]
// POST 	...api/dieta 		                    Dieta
// PUT 	...api/dieta/:id 	                    Dieta
// DELETE 	...api/dieta/:id 

    getDietaList(hc_id:string):Observable<Dieta[]>{
      return this.http.get<Dieta[]>(`${environment.apiUrl}/dieta/historia_clinica/`+hc_id+`/list`)
    }

    getDieta(id:string):Observable<Dieta>{
      return this.http.get<Dieta>(`${environment.apiUrl}/dieta/`+id)
    }

    //ver url despues
    getCurrentDieta(id:string):Observable<Dieta>{
      return this.http.get<Dieta>(`${environment.apiUrl}/dieta/historia_clinica/`+id+`/current`)
    }

    newDieta(dieta:Dieta):Observable<any>{
      return this.http.post(`${environment.apiUrl}/dieta/`, dieta)
    }

    updateDieta(id:string, dieta:Dieta):Observable<any>{
      return this.http.put(`${environment.apiUrl}/dieta/`+id, dieta)
    }

    deleteDieta(id:string):Observable<any>{
      return this.http.delete(`${environment.apiUrl}/dieta/`+id)
    }
}
