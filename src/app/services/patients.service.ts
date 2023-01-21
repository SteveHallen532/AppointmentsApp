import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Patient } from '../models/Patient';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

constructor(private http: HttpClient) { }

    getPatients():Observable<Patient[]>{
      return this.http.get<Patient[]>(`${environment.apiUrl}/patient/list`)
    }

    getPatient(id:string):Observable<Patient>{
      return this.http.get<Patient>(`${environment.apiUrl}/patient/`+id)
    }

    newPatient(patient:Patient):Observable<any>{
      return this.http.post(`${environment.apiUrl}/patient/`, patient)
    }

    updatePatient(id:string, patient:Patient):Observable<any>{
      return this.http.put(`${environment.apiUrl}/patient/`+id, patient)
    }

    deletePatient(id:string):Observable<any>{
      return this.http.delete(`${environment.apiUrl}/patient/`+id)
    }

}
