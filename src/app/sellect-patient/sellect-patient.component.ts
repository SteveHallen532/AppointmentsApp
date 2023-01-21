import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../models/Appointment';
import { Patient } from '../models/Patient';
import { AppointmentsService } from '../services/appointments.service';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-sellect-patient',
  templateUrl: './sellect-patient.component.html',
  styleUrls: ['./sellect-patient.component.css']
})
export class SellectPatientComponent implements OnInit {

  id = '';

  loading = true;

  patients:Patient[] = [];

  appointment = new Appointment;

  filterargs='';
  subtitle='Filtrar por nombre o apellido'
 
  constructor(private activatedRoute: ActivatedRoute, private patients_service:PatientsService, private appointment_service: AppointmentsService, private router:Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getAppointment(this.id);
    this.getPatients();  
  }

  getPatients(){
    this.patients_service.getPatients()
    .subscribe(
      result =>{
        this.patients=result;
        this.loading = false;
      }
    ) 
  }

  getAppointment(id:string){
    this.appointment_service.getAppointment(id)
    .subscribe(
      result => {
        this.appointment = result;
      }
    )
  }

  assign(patient:Patient){
    this.appointment_service.assign(this.appointment._id, patient._id, this.appointment)
    .subscribe(
      () =>{
        this.router.navigate(['/appointments-list'])
      }
    )
  }

}
