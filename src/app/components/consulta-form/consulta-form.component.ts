import { Component, OnInit } from '@angular/core';
import { Consulta } from '../../models/Consulta';
import { ConsultasService } from '../../services/consultas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { PatientsService } from 'src/app/services/patients.service';
import { Patient } from 'src/app/models/Patient';


@Component({
  selector: 'app-consulta-form',
  templateUrl: './consulta-form.component.html',
  styleUrls: ['./consulta-form.component.css']
})
export class ConsultaFormComponent implements OnInit {
 
  today = moment().format('YYYY-MM-DD');
  id: string = '';
  id_patient = '';
  id_consulta = '';
  patient: Patient = new Patient;
  consulta: Consulta = new Consulta;

  constructor(private consulta_service: ConsultasService,
              private patient_service: PatientsService, 
              private activatedRoute:ActivatedRoute, 
              private router: Router,
              private location:Location) { }

  ngOnInit(): void {
    this.consulta.fecha = this.today;
    this.id_patient = this.activatedRoute.snapshot.params['id_patient'];
    this.id = this.activatedRoute.snapshot.params['id'];
    this.id_consulta = this.activatedRoute.snapshot.params['id_consulta']
    this.consulta.historia_clinica._id = this.id;
    this.getPatient()
  }

  getConsulta() {
    if(this.id_consulta != undefined && this.id_consulta != '') {
      this.consulta_service.getConsulta(this.id, this.id_consulta).subscribe(
        (result)=> {
          this.consulta = result;
        }
      )
    }
  }

  getPatient() {
    this.patient_service.getPatient(this.id_patient).subscribe(
      (result)=>{
        this.patient = result;
        this.getConsulta()
      }
    )
  }

  saveConsulta() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Datos guardados',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.consulta_service.newConsultas(this.consulta, this.id)
      .subscribe(() =>{
        this.location.back();
        }
      )
    })
  }   

  cancel(){
    
    if(this.consulta.circunferencia_de_cintura != '' || this.consulta.peso != '' || this.consulta.fecha != ''
    || this.consulta.circunferencia_de_cintura_baja != '' || this.consulta.cadera != '' || this.consulta.circunferencia_de_muslo != '' 
    || this.consulta.torax != '' || this.consulta.torax_alto != '' || this.consulta.busto != '' || this.consulta.busto_medio != '' 
    || this.consulta.cuello != '' || this.consulta.brazo != '') {
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

  back() {
    this.location.back();
  }

  //Validation
  min= 10; 
  max = 200;

  minWeight = 0.5;
  maxWeight= 400;

  isBefore(a:string) {
    return moment(this.today).isBefore(a);
  }

  outOfRange(a:string) {
    return moment(a).isBefore(moment('01/01/1920'));
  }

  minMaxValidation(a, b, c){
    
    if (a <= Number(b) && Number(b) <= c) {
      return true;
    } else {
      return false
    }
  }

}
