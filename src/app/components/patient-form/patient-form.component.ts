import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/Patient';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { Router } from '@angular/router';
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
  route:string = '';
  gender = ['Femenino', 'Masculino'];
  selected = 'Género';
  currentUser: Usuario;
  today= moment().format('YYYY-MM-DD');


  constructor(private activatedRoute: ActivatedRoute, 
              private patients_service:PatientsService, 
              private router: Router,
              private auth_service: AuthenticationService,
              private location:Location) {}

  ngOnInit(): void {
    console.log(this.today)
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
        this.patients_service.newPatient(this.patient)
      .subscribe(() =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Guardado',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => this.router.navigate(['/patients-list']), 1000);
        });
      }
    } else {
      if(this.patient.nombre != '' && this.patient.apellido != '') {
        this.patients_service.updatePatient(this.id, this.patient)
        .subscribe(() =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Guardado',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => this.location.back(), 1000);  
        });
      }
    }    
  }

  cancel(){

    if(this.patient.nombre != '' && this.patient.apellido != '') {
      Swal.fire({
        title: 'Seguro?',
        text: "Desea salir sin guardar los datos?",
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

}
