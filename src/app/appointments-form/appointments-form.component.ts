import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../models/Appointment';
import { Patient } from '../models/Patient';
import { AppointmentsService } from '../services/appointments.service';
import { PatientsService } from '../services/patients.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointments-form',
  templateUrl: './appointments-form.component.html',
  styleUrls: ['./appointments-form.component.css']
})
export class AppointmentsFormComponent implements OnInit {

  id: string = '';
  patients: Patient[] = [];
  patient: Patient = new Patient;
  appointment: Appointment = new Appointment; 
  selectedPatient: string = '';
  subtitle='Filtrar por nombre o apellido'

  constructor(private location:Location, private router:Router, private activatedRoute:ActivatedRoute, private patient_service:PatientsService, private appointment_service:AppointmentsService) { }
  

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if(this.id == undefined) {
      this.id = 'new';
    } else {
      this.appointment_service.getAppointment(this.id)
      .subscribe(
        result => {
          this.appointment = result;
          this.patient = this.appointment.patient;
          this.selectedPatient = this.patient.nombre + ' ' + this.patient.apellido;
          console.log(this.patient)
          console.log(this.appointment.patient)
        }
      )
    }

    this.patient_service.getPatients()
    .subscribe(
      result => {
        this.patients = result;
      }
    )
  }

  //Se va a romper cuando ponga segundo nombre
  newAppointment(){
    let name = this.selectedPatient.split(' ');
    let selected = this.patients.filter(
      (patient) => {
        if (patient.nombre == name[0] &&  patient.apellido == name[1]){
          return patient;
        } else {
          return false;
        }
      }
    );

    this.appointment.patient = selected[0];
    this.appointment.sobreturno = true;
    this.appointment.asignado = true;
    this.appointment_service.newAppointment(this.appointment).subscribe(
      () => {
        this.router.navigate(['/appointments-list']);
      }
    )
  }

  //Se va a romper cuando ponga segundo nombre
  updateAppointment() {
    let name = this.selectedPatient.split(' ');
    let selected = this.patients.filter(
      (patient) => {
        if (patient.nombre == name[0] &&  patient.apellido == name[1]){
          return patient;
        } else {
          return false;
        }
      }
    );

    this.appointment.patient = selected[0];
    this.appointment.sobreturno = true;
    this.appointment.asignado = true;
    this.appointment_service.updateAppointment(this.appointment._id, this.appointment)
    .subscribe(
      () => {
        this.location.back();
      }
    )
  }

  request() {
    if(this.id == "new") {
      if(this.selectedPatient != "Paciente") {
        this.newAppointment();
      }
    } else {
      this.updateAppointment();
    }
  }

  Cancelar() {
    this.location.back()
  }

}
