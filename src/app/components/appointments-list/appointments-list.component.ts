import { ConditionalExpr } from '@angular/compiler/public_api';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { resourceUsage } from 'process';
import { elementAt } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Appointment } from '../../models/Appointment';
import { Patient } from '../../models/Patient';
import { AppointmentsService } from '../../services/appointments.service';
import { PatientsService } from '../../services/patients.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  @Input() appointmentsInput: Appointment[] = [];

  date1 = '';

  date2 = '';

  idPatient = '';

  patient = new Patient;

  loading = true;

  dates: Array<any> = [];

  appointments: Appointment[] = [];

  appointment: Appointment = new Appointment;

  currentUser: Usuario;

  constructor(private patient_service:PatientsService, 
              private activatedRoute:ActivatedRoute, 
              private appointment_service:AppointmentsService, 
              private router:Router,
              private auth_service: AuthenticationService ) { }

  ngOnInit(): void {
    this.auth_service.currentUser.subscribe(x => {this.currentUser = x});
    this.idPatient = this.activatedRoute.snapshot.params['id'];
    if(this.appointmentsInput.length <= 0) {
      this.getAppointments(this.currentUser.organizacion._id);
    } else {
      this.appointments = this.appointmentsInput;
      if(this.appointments.length > 0) {
        this.getDates();
      } else {
        this.loading = false;
      }
      
    }
    
  }

  getAppointments(organizacion_id){
    this.appointment_service.getAppointments(organizacion_id)
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
      sameDay: '[Hoy] - DD/MM/YYYY',
      nextDay: '[Mañana] - DD/MM/YYYY',
      nextWeek: 'dddd - DD/MM/YYYY',
      lastDay: '[Ayer] - DD/MM/YYYY',
      lastWeek: 'dddd [pasado] - DD/MM/YYYY',
      sameElse: 'dddd DD/MM/YYYY'
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
        Swal.fire({
          title: 'Liberar?',
          text: "Liberar turno?",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Liberar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Hecho!',
              'Turno liberado.',
              'success'
            )
            setTimeout(() =>  location.reload(), 1500)
          }
        })
      }
    )
  }

  // Request hecha desde consultas/id_patient
  assign(){
    this.appointment_service.assign(this.appointment._id, this.patient._id, this.appointment)
    .subscribe(
      () =>{

        Swal.fire({
          title: 'Asignar?',
          text: "Asignar turno a " + this.patient.nombre + ' ' + this.patient.apellido + ' el ' + moment(this.appointment.fecha).format('DD/MM/YYYY') + ' a las ' + this.appointment.hora,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Asignar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Hecho!',
              'Turno asignado.',
              'success'
            )
            setTimeout(() => this.router.navigate(['/consultas/' + this.patient._id]), 1000)
            }
        })

      }
    )
  }

  lock(id:string, appointment:Appointment) {
    this.appointment_service.lock(id, appointment)
    .subscribe(
      () => {
        Swal.fire({
          title: 'Bloquear?',
          text: "Bloquear turno?",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Bloquear!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Hecho!',
              'Sobreturno bloqueado.',
              'success'
            )
            setTimeout(() =>  location.reload(), 1500)
          }
        })
      }
    )
  }

  unLock(id:string, appointment:Appointment) {
    this.appointment_service.unLock(id, appointment)
    .subscribe(
      () => {
        Swal.fire({
          title: 'Desbloquear?',
          text: "Desbloquear turno?",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Desloquear!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Hecho!',
              'Sobreturno desbloqueado.',
              'success'
            )
            setTimeout(() =>  location.reload(), 1500)
          }
        })
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
    if(this.idPatient != undefined){
      this.router.navigate(['/appointments-form','', this.idPatient]);
    } else {
      this.router.navigate(['/appointments-form']);
    }
  }

  edit(id:string){
    this.router.navigate(['/appointments-form', id]);
  }

  delete(id:string){
    Swal.fire({
      title: 'Estás seguro?',
      text: "Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointment_service.deleteAppointment(id)
          .subscribe(() =>{
            Swal.fire(
              'Hecho!',
              'Sobreturno eliminado.',
              'success'
            )
            setTimeout(() => window.location.reload(), 1500)
            }
          );
      }
    })
  }

}
