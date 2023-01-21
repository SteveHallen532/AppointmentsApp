import { ConditionalExpr } from '@angular/compiler/public_api';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { resourceUsage } from 'process';
import { elementAt } from 'rxjs';
import { Appointment } from '../models/Appointment';
import { Patient } from '../models/Patient';
import { AppointmentsService } from '../services/appointments.service';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  @Input() appointmentsInput: Appointment[] = [];

  idPatient = '';

  patient = new Patient;

  loading = true;

  dates: Array<any> = [];

  appointments: Appointment[] = [];

  appointment: Appointment = new Appointment;

  constructor(private patient_service:PatientsService, private activatedRoute:ActivatedRoute, private appointment_service:AppointmentsService, private router:Router, ) { }

  ngOnInit(): void {
    this.idPatient = this.activatedRoute.snapshot.params['id'];
    if(this.appointmentsInput.length <= 0) {
      this.getAppointments();
    } else {
      this.appointments = this.appointmentsInput;
      if(this.appointments.length > 0) {
        this.getDates();
      } else {
        this.loading = false;
      }
      
    }
    
  }

  getAppointments(){
    this.appointment_service.getAppointments()
    .subscribe(
      result => {
        this.appointments = result;
        this.orderByDate(this.appointments);
        this.getDates();
      }
    );
  }

  orderByDate(arr:Array<Appointment>) {
    let now = moment().format("YYYY MM DD HH:mm");
    arr = arr.filter(
      appointment => { return (moment(appointment.fecha +' '+ appointment.hora))
      .isSameOrAfter(now)}
    );
    arr = arr.sort((a:Appointment, b:Appointment) => {
      let momentA = moment(a.fecha +' '+ a.hora).format("YYYY MM DD HH:mm");
      let momentB = moment(b.fecha +' '+ b.hora).format("YYYY MM DD HH:mm"); 
      return moment(momentA).isBefore(momentB) ? -1 : 1; 
    });
    this.appointments = arr;
  }

  getDates() {
    let firstAppointment = this.appointments[0].fecha;
    this.dates.push(firstAppointment);
    for (let i = 1; i < this.appointments.length; i++) {
      let date = this.appointments[i].fecha;
      if(date != this.appointments[i-1].fecha) {
        this.dates.push(date);
      }      
    }
    this.loading = false;
  }

  isSameDate(a:any, b:any){
    return moment(a).isSame((moment(b)));
  }

  calendarize(a:string) {
    return moment(a, "YYYY MM DD").locale('es').calendar(null, {
      sameDay: '[Hoy]',
      nextDay: '[Mañana]',
      nextWeek: 'dddd',
      lastDay: '[Ayer]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    })
  }

  select(id:string) {
    if(this.idPatient != undefined) {
      this.getPatient(id);
    } else {
      this.router.navigate(['/select-patient', id]);
    }
  }

  getPatient(id:string) {
    this.patient_service.getPatient(this.idPatient)
    .subscribe(
      result => {
        this.patient = result;
        this.getAppointment(id);
      }
    )
  }

  getAppointment(id:string){
    this.appointment_service.getAppointment(id)
    .subscribe(
      result => {
        this.appointment = result;
        this.assign();
      }
    );
  }

  unAssign(id:string){
    this.appointment_service.unAssign(id, this.appointment)
    .subscribe(
      () =>{
        location.reload();
      }
    )
  }

  assign(){
    this.appointment_service.assign(this.appointment._id, this.patient._id, this.appointment)
    .subscribe(
      () =>{
        this.router.navigate(['/consultas/' + this.patient._id])
      }
    )
  }

  lock(id:string, appointment:Appointment) {
    this.appointment_service.lock(id, appointment)
    .subscribe(
      () => {
        location.reload();
      }
    )
  }

  unLock(id:string, appointment:Appointment) {
    this.appointment_service.unLock(id, appointment)
    .subscribe(
      () => {
        location.reload();
      }
    )
  }

  confirm(id:string, appointment:Appointment) {
    this.appointment_service.confirm(id, appointment)
    .subscribe(
      () => {
        location.reload();
      }
    )
  }

  disConfirm(id:string, appointment:Appointment) {
    this.appointment_service.disconfirm(id, appointment)
    .subscribe(
      () => {
        location.reload();
      }
    )
  }


  //Solo para los sobreturnos

  squeezeIn(){
    this.router.navigate(['/appointments-form']);
  }

  edit(id:string){
    this.router.navigate(['/appointments-form', id]);
  }

  delete(id:string){
    this.appointment_service.deleteAppointment(id)
    .subscribe(
      () => {
        location.reload();
      }
    )
  }

}
