import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from '../../models/HistoriaClinica';
import { MedicalHistoryService } from '../../services/medical-history.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { Patient } from '../../models/Patient';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-medical-history-form',
  templateUrl: './medical-history-form.component.html',
  styleUrls: ['./medical-history-form.component.css']
})
export class MedicalHistoryFormComponent implements OnInit {

  patient: Patient = new Patient;
  medicalHistory: HistoriaClinica = new HistoriaClinica;
  id_medical_History: string = '';
  id_patient = '';
  today = moment().format('YYYY-MM-DD');

  constructor(private medical_history_service: MedicalHistoryService, 
              private router:Router, 
              private activatedRoute:ActivatedRoute, 
              private patient_service: PatientsService,
              private location:Location) { }

  ngOnInit(): void {
    this.id_patient = this.activatedRoute.snapshot.params['id_patient'];
    this.id_medical_History = this.activatedRoute.snapshot.params['id'];
    this.getMedicalHistory();
    this.getPatient();
  }

  getPatient() {
    this.patient_service.getPatient(this.id_patient)
    .subscribe(
      result => {
        this.patient = result;
      }
    );
  }

  getMedicalHistory() {
    this.medical_history_service.getMedicalHistoryFromId(this.id_medical_History)
    .subscribe(
      result => {
        this.medicalHistory = result;
      }
    );
  }

  editMedicalHistory() {
    this.medical_history_service.updateMedicalHistory(this.id_medical_History, this.medicalHistory)
    .subscribe(
      () => {
        Swal.fire({
          title: 'Editar?',
          text: "Guardar cambios en Historia Clínica?",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Editar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Guardado',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['medical-history/' + this.id_medical_History + '/' + this.patient._id])
          }
        })
      }
    )
  }

  cancel() {
    this.router.navigate(['medical-history/' + this.id_medical_History + '/' + this.patient._id]);
  }

  back() {
    this.location.back();
  }

    //Validation
    minHeight = 10; 
    maxHeight = 200;
  
    minWeight = 0.5;
    maxWeight = 400;

    min = 1;
    max = 50;
  
    isBefore(a:string) {
      if(a) {
        return moment(this.today).isBefore(a);
      }
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
