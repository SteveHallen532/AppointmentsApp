import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistoriaClinica} from '../models/HistoriaClinica';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  constructor(private http:HttpClient) { }

  getMedicalHistoryFromId(id:string):Observable<HistoriaClinica>{
    return this.http.get<HistoriaClinica>(`${environment.apiUrl}/historia_clinica/`+id)
  }

  getMedicalHistoryFromPatient(id_patient:string):Observable<HistoriaClinica>{
    return this.http.get<HistoriaClinica>(`${environment.apiUrl}/historia_clinica/patient/`+id_patient)
  }

  updateMedicalHistory(id:string, medicalHistory:HistoriaClinica):Observable<any>{
    return this.http.put(`${environment.apiUrl}/historia_clinica/`+id, medicalHistory)
  }
}
