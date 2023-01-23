import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http:HttpClient) {}

  getAppointments(organizacion_id):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${environment.apiUrl}/appointment_clinica/list/`+organizacion_id)
  }

  getAppointment(id:string):Observable<Appointment>{
    return this.http.get<Appointment>(`${environment.apiUrl}/appointment_clinica/`+id)
  }

  getAppointmentsPatient(id:string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${environment.apiUrl}/appointment_clinica/patient/`+id)
  }

  newAppointment(appointment:Appointment):Observable<any>{
    return this.http.post(`${environment.apiUrl}/appointment_clinica/`, appointment)
  }

  updateAppointment(id:string, appointment:Appointment):Observable<any>{
    return this.http.put(`${environment.apiUrl}/appointment_clinica/`+id, appointment)
  }

  deleteAppointment(id:string):Observable<any>{
    return this.http.delete(`${environment.apiUrl}/appointment_clinica/`+id)
  }

  assign(id:string, patient_id:string, appointment:Appointment):Observable<any>{
    return this.http.post(`${environment.apiUrl}/appointment_clinica/` + id + `/asignar/` + patient_id, appointment)
  }

  unAssign(id:string, appointment:Appointment):Observable<any>{
    return this.http.post(`${environment.apiUrl}/appointment_clinica/`+id+ `/liberar`, appointment)
  }

  lock(id:string, appointment:Appointment):Observable<any>{
    return this.http.post(`${environment.apiUrl}/appointment_clinica/`+id+ `/bloquear`, appointment)
  }

  unLock(id:string, appointment:Appointment):Observable<any>{
    return this.http.post(`${environment.apiUrl}/appointment_clinica/`+id+ `/desbloquear`, appointment)
  }

  confirm(id:string, appointment:Appointment):Observable<any>{
    return this.http.post(`${environment.apiUrl}/appointment_clinica/`+id+ `/confirmar`, appointment)
  }

  disconfirm(id:string, appointment:Appointment):Observable<any>{
    return this.http.post(`${environment.apiUrl}/appointment_clinica/`+id+ `/desconfirmar`, appointment)
  }



}
