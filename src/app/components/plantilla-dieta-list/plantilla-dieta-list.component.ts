import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantillaDieta } from 'src/app/models/PlantillaDieta';
import { PlantillaDietaService } from 'src/app/services/plantilla-dieta.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-plantilla-dieta-list',
  templateUrl: './plantilla-dieta-list.component.html',
  styleUrls: ['./plantilla-dieta-list.component.css']
})
export class PlantillaDietaListComponent implements OnInit {

  currentUser: Usuario;
  loading = true;
  plantillaDietaList: PlantillaDieta[];

  constructor(private router:Router, private plantilla_dieta_service:PlantillaDietaService,  private auth_service: AuthenticationService) { }

  ngOnInit(): void {
    this.auth_service.currentUser.subscribe(x => {this.currentUser = x});
    this.getPlantillaDietaList(this.auth_service.currentUserValue.organizacion._id);
  }

  getPlantillaDietaList(organizacion_id) {
    this.plantilla_dieta_service.getPlantillaDietaList(organizacion_id).subscribe(
      result => {
        this.plantillaDietaList = result;
        this.loading = false;
      }
    )
  }

  goToPlantillaDietaForm() {
    this.router.navigate(['plantilla-dieta-form/']);
  }

  goToPlantillaDieta(id:string) {
    this.router.navigate(['plantilla-dieta-component/', id]);
  }

  goToEditPlantillaDieta(id:string) {
    this.router.navigate(['plantilla-dieta-form/', id]);
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
        this.plantilla_dieta_service.deletePlantillaDieta(id)
          .subscribe(() =>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Dieta eliminada',
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(() => window.location.reload(), 1000)
            }
          );
      }
    })
  }

  back() {
    this.router.navigate(['home']);
  }

}
