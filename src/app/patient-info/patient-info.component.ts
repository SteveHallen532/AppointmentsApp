import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../models/Patient';
import { PatientsService } from '../services/patients.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {
  loading = true;
  id: string = '';
  patient: Patient = new Patient;
  
  constructor(private activatedRoute: ActivatedRoute, private patients_service:PatientsService, private router:Router) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getPatient(this.id);
  }

    getPatient(id:string){
      this.patients_service.getPatient(id)
      .subscribe(
        result =>{
          this.patient = result;
          this.loading = false;
        }
      ) 
    }

    delete(id:string){
      this.patients_service.deletePatient(id)
      .subscribe(() =>{
          this.router.navigate(['/patients-list'])
        }
      );
    }

    goToPatientForm() {
      this.router.navigate(['/patient-form', this.patient._id, '/patient-info'])
    }

  }
