import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { HistoriaClinica } from '../../models/HistoriaClinica';
import { Patient } from '../../models/Patient';
import { MedicalHistoryService } from '../../services/medical-history.service';
import { PatientsService } from '../../services/patients.service';
import { Dieta } from 'src/app/models/Dieta';
import { DietaService } from 'src/app/services/dieta.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {

  loading = true;

  showMedicalHistory = false;

  id_patient: string = '';

  id_medical_history = '';

  currentDieta = new Dieta;

  patient: Patient = new Patient;

  medicalHistory: HistoriaClinica = new HistoriaClinica;

  constructor(private dieta_service:DietaService, private router:Router, private medical_history_service:MedicalHistoryService, private patient_service:PatientsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_medical_history = this.activatedRoute.snapshot.params['id'];
    this.id_patient = this.activatedRoute.snapshot.params['id_patient'];
    this.getPatient();
    this.getMedicalHistory();
    this.getCurrentDieta();
  }

  getMedicalHistory() {
    this.medical_history_service.getMedicalHistoryFromId(this.id_medical_history)
    .subscribe(
      result => {
        this.medicalHistory = result;
        this.loading = false;
      }
    );
  }

  getCurrentDieta() {
    this.dieta_service.getCurrentDieta(this.id_medical_history).subscribe(
      result => {
        this.currentDieta = result[0];
      }
    )
  }

  getPatient() {
    this.patient_service.getPatient(this.id_patient)
    .subscribe(
      result => {
        this.patient = result;
      }
    );
  }

  goToEditForm() {
    this.router.navigate(['/medical-history-form', this.medicalHistory._id, this.id_patient])
  }

  goToDieta() {
    this.router.navigate(['dieta/', this.medicalHistory._id, this.patient._id])
  }

  goToInbody() {
    this.router.navigate(['inbody/', this.id_medical_history])
  }

  show() {
    if (this.showMedicalHistory == true) {
      this.showMedicalHistory = false;
    } else {
      this.showMedicalHistory = true;
    }
  }

  back() {
    this.router.navigate(['/consultas', this.id_patient])
    }

}
