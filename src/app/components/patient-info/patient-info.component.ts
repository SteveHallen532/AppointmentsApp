import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../models/Patient';
import { PatientsService } from '../../services/patients.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



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
      Swal.fire({
        title: 'Seguro?',
        text: "Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.patients_service.deletePatient(id)
          .subscribe(() =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Paciente eliminado',
              showConfirmButton: false,
              timer: 1500
            })
          });
          setTimeout(() => this.router.navigate(['/patients-list']), 1000)
        }
      }) 
    }

    goToPatientForm() {
      this.router.navigate(['/patient-form', this.patient._id, '/patient-info'])
    }

  }
