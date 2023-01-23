import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/Patient';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';


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

  constructor(private activatedRoute: ActivatedRoute, 
              private patients_service:PatientsService, 
              private router: Router,
              private auth_service: AuthenticationService) {}

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
          this.router.navigate(['/patients-list']);  
        }
      );
      }
    } else {
      if(this.patient.nombre != '' && this.patient.apellido != '') {
        this.patients_service.updatePatient(this.id, this.patient)
        .subscribe(() =>{
          if(this.route == '/patients-list') {
            this.router.navigate([this.route]);
          } else {
            this.router.navigate([this.route, this.id]);
          }
        });
      }
    }    
  }

  cancel(){
    if(this.id == 'new'){
      this.router.navigate(['/patients-list']);
    } else {
      if(this.route == '/patients-list') {
        this.router.navigate([this.route]);
      } else {
        this.router.navigate([this.route, this.id]);
      }
    }
  }

}
