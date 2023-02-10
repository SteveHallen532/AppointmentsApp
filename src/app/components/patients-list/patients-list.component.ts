import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../models/Patient';
import { PatientsService } from '../../services/patients.service';
import Swal from 'sweetalert2'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  loading = true;

  patients:Patient[] = [];

  filterargs='';
  subtitle='Filtrar por nombre o apellido'
  currentUser: Usuario;

  constructor(private patients_service:PatientsService, 
              private router:Router,
              private auth_service: AuthenticationService
              ) { }

  ngOnInit(): void {
    this.auth_service.currentUser.subscribe(x => {this.currentUser = x});
    this.getPatients(this.auth_service.currentUserValue.organizacion._id);
  }

  getPatients(organizacion_id){
    this.patients_service.getPatients(organizacion_id)
    .subscribe(
      result =>{
        this.patients=result;
        this.loading = false;
      }
    ) 
  }
  
  delete(id:string) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
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
            setTimeout(() => window.location.reload(), 1000)
            }
          );
      }
    })

    
  }

  goToPatientForm() {
    this.router.navigate(['/patient-form/new/patients-list'])
  }

  goToConsultas(id:string) {
    this.router.navigate(['/consultas', id])
  }

  goToEditPatient(id:string) {
    this.router.navigate(['/patient-form', id, '/patients-list'])
  }

}

