import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/Patient';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { Usuario } from 'src/app/models/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})

export class PatientFormComponent implements OnInit {

  id: string = '';
  patient: Patient = new Patient;
  controlPatient = new Patient;
  route:string = '';
  gender = ['Femenino', 'Masculino'];
  selected = 'Género';
  currentUser: Usuario;
  today= moment().format('YYYY-MM-DD');

  constructor(private activatedRoute: ActivatedRoute, 
              private patients_service:PatientsService, 
              private auth_service: AuthenticationService,
              private location:Location) {}

  ngOnInit(): void {
    this.auth_service.currentUser.subscribe(x => {this.currentUser = x});
    this.id = this.activatedRoute.snapshot.params['id'];
    this.route = this.activatedRoute.snapshot.params['route']
    if(this.id != "new") {
      this.getPatient(this.id);
    }
  }

  getPatient(id:string){
    this.patients_service.getPatient(id)
    .subscribe(
      result =>{
        this.patient = result;
        this.controlPatient.apellido += result.apellido;
        this.controlPatient.dni += result.dni;
        this.controlPatient.email += result.email;
        this.controlPatient.fecha_nacimiento += result.fecha_nacimiento;
        this.controlPatient.genero += result.genero;
        this.controlPatient.nombre += result.nombre;
        this.controlPatient.num_obra_social += result.num_obra_social;
        this.controlPatient.obra_social += result.obra_social;
        this.controlPatient.telefono += result.telefono;
        if (this.patient.genero != '') {
          this.selected = this.patient.genero;
        }
      }
    ) 
  }

  request(){
    if (this.selected == 'Género') {
      this.patient.genero = '';
    } else {
      this.patient.genero = this.selected;
    }
    if(this.id == "new"){ 
      if(this.patient.nombre != '' && this.patient.apellido != '') {
        this.patient.organizacion = this.currentUser.organizacion;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Guardado',
          showConfirmButton: false,
          timer: 1500 })
        .then(() =>{
          this.patients_service.newPatient(this.patient).subscribe(()=>{
          this.location.back();
          })
        })
        //setTimeout(() => this.location.back(), 1000);
      }
    } else {
      if(this.patient.nombre != '' && this.patient.apellido != '') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Guardado',
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          this.patients_service.updatePatient(this.id, this.patient)
          .subscribe(() =>{
            this.location.back();
          });
        })
          //setTimeout(() => this.location.back(), 1000);    
      }
    }    
  }

  cancel(){
    if (this.selected == 'Género') {
      this.patient.genero = '';
    } else {
      this.patient.genero = this.selected;
    }
    console.log(this.controlPatient.genero, this.selected)
    if((this.id == "new" && this.patient.nombre != '' && this.patient.apellido != '') || 
    ((this.id != "new") && (this.controlPatient.apellido != this.patient.apellido || this.controlPatient.nombre != this.patient.nombre || 
      this.controlPatient.dni != this.patient.dni || this.controlPatient.email != this.patient.email || 
      this.controlPatient.fecha_nacimiento != this.patient.fecha_nacimiento || 
      this.controlPatient.genero != this.patient.genero || this.controlPatient.num_obra_social != this.patient.num_obra_social || 
      this.controlPatient.obra_social != this.patient.obra_social || this.controlPatient.telefono != this.patient.telefono))) {
      
      Swal.fire({
        title: 'Seguro?',
        text: "Desea salir sin guardar los cambios?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Salir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.location.back();
        }
      })
    } else {
      this.location.back();
    }  

  }

  back() {
    if(this.id == "new" && this.patient.nombre != '' && this.patient.apellido != '' || (this.id != "new" && (this.controlPatient.apellido != this.patient.apellido || 
      this.controlPatient.nombre != this.patient.nombre || 
      this.controlPatient.dni != this.patient.dni || this.controlPatient.email != this.patient.email || 
      this.controlPatient.fecha_nacimiento != this.patient.fecha_nacimiento || 
      this.controlPatient.genero != this.selected || this.controlPatient.num_obra_social != this.patient.num_obra_social || 
      this.controlPatient.obra_social != this.patient.obra_social || this.controlPatient.telefono != this.patient.telefono))) {
      Swal.fire({
        title: 'Seguro?',
        text: "Desea salir sin guardar los cambios?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Salir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.location.back();
        }
      })
    } else {
      this.location.back();
    }
  }

  //date validation

  isBefore(a:string) {
    return moment(this.today).isBefore(a);
  }

  outOfRange(a:string) {
    return moment(a).isBefore(moment('01/01/1920'));
  }

}
