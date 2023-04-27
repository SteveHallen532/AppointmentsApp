import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { PlantillaDieta } from 'src/app/models/PlantillaDieta';
import { PlantillaDietaService } from 'src/app/services/plantilla-dieta.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plantilla-dieta-form',
  templateUrl: './plantilla-dieta-form.component.html',
  styleUrls: ['./plantilla-dieta-form.component.css']
})
export class PlantillaDietaFormComponent implements OnInit {

  plantillaDieta:PlantillaDieta = new PlantillaDieta;
  id:string;
  origin:string;
  currentUser: Usuario;
  tipoControl = '';
  descripcionControl = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '70vh',
    minHeight: '5rem',
    placeholder: 'Seleccione una plantilla o ingrese una descripción....',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'Quote',
        class: 'quoteClass',
      },
      {
        name: 'Title Heading',
        class: 'titleHead',
        tag: 'h1',
      },
    ],
  };

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private plantilla_dieta_service:PlantillaDietaService, private location:Location, private auth_service:AuthenticationService) { }

  ngOnInit(): void {
    this.auth_service.currentUser.subscribe(x => {this.currentUser = x});
    this.origin = this.activatedRoute.snapshot.params['origin'];
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id != undefined) {
      this.getPlantillaDieta()
    }
  }

  getPlantillaDieta() {
    this.plantilla_dieta_service.getPlantillaDieta(this.id).subscribe(
      result => {
        this.plantillaDieta = result;
        this.tipoControl += this.plantillaDieta.tipo;
        this.descripcionControl += this.plantillaDieta.descripcion
      }
    )
  }

  savePlantillaDieta() {
    if(this.id==undefined) {
      this.plantillaDieta.organizacion = this.currentUser.organizacion;
      this.plantilla_dieta_service.newPlantillaDieta(this.plantillaDieta).subscribe(
        () => {

            Swal.fire({
              title: 'Guardar?',
              text: "Guardar cambios?",
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Guardar!',
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
                this.router.navigate(['plantilla-dieta-list']);
              }
            }) 

        }
      )
    } else {
      if(this.origin == 'list') {

        Swal.fire({
          title: 'Editar?',
          text: "Guardar cambios?",
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
            this.plantilla_dieta_service.updatePlantillaDieta(this.id, this.plantillaDieta).subscribe(
              () => {
                this.router.navigate(['plantilla-dieta-list']);
              }
            )
          }
        })
       
      } else {

        Swal.fire({
          title: 'Editar?',
          text: "Guardar cambios?",
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
            this.plantilla_dieta_service.updatePlantillaDieta(this.id, this.plantillaDieta).subscribe(
              () => {
                this.router.navigate(['plantilla-dieta-component', this.id]);
              }
            )
          }
        })
        
      }
    }
    
  }

  cancel() {
    if(this.tipoControl != this.plantillaDieta.tipo || this.descripcionControl != this.plantillaDieta.descripcion) {
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
    if(this.tipoControl != this.plantillaDieta.tipo || this.descripcionControl != this.plantillaDieta.descripcion) {
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

}
