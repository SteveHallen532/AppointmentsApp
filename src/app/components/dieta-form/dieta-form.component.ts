import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ActivatedRoute} from '@angular/router';
import { Dieta } from 'src/app/models/Dieta';
import { PlantillaDietaService } from 'src/app/services/plantilla-dieta.service';
import { PlantillaDieta } from 'src/app/models/PlantillaDieta';
import { Usuario } from 'src/app/models/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DietaService } from 'src/app/services/dieta.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dieta-form',
  templateUrl: './dieta-form.component.html',
  styleUrls: ['./dieta-form.component.css']
})
export class DietaFormComponent implements OnInit {

  today = moment();
  currentUser: Usuario;
  id:string;
  dieta_id:string;
  dieta = new Dieta;
  currentDieta:Dieta;
  plantillaDietaList: PlantillaDieta[];
  selected:PlantillaDieta = new PlantillaDieta;
  tipoControl = '';
  descripcionControl = '';
  fechaConrol = '';
  
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


  constructor(private auth_service: AuthenticationService, private plantilla_dieta_service:PlantillaDietaService, private dieta_service:DietaService, private location:Location, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.auth_service.currentUser.subscribe(x => {this.currentUser = x});
    this.id = this.activatedRoute.snapshot.params['id'];
    this.dieta_id = this.activatedRoute.snapshot.params['dieta_id'];

    if(this.dieta_id!=undefined) {
      this.getDieta(this.dieta_id);  
    }

    if(this.dieta_id==undefined) {
      this.getCurrentDieta(this.id);
    }

    this.getPlantillaDietaList(this.auth_service.currentUserValue.organizacion._id);

  }

  getCurrentDieta(id:string) {
    this.dieta_service.getCurrentDieta(id).subscribe(
      result => {
        this.currentDieta = result[0];
      }
    )
  }

  getDieta(id:string) {
    this.dieta_service.getDieta(id).subscribe(
      result => {
        this.dieta = result;
        this.selected.tipo = this.dieta.tipo;
        this.selected.descripcion = this.dieta.descripcion;
        this.tipoControl += this.dieta.tipo;
        this.descripcionControl += this.dieta.descripcion;
        this.fechaConrol += this.dieta.inicio;
      }
    )
  }

  getPlantillaDietaList(organizacion_id) {
    this.plantilla_dieta_service.getPlantillaDietaList(organizacion_id).subscribe(
      result => {
        this.plantillaDietaList = result;
      }
    )
  }

  saveDieta() {
    this.dieta.tipo = this.selected.tipo;
    this.dieta.descripcion = this.selected.descripcion;
    this.dieta.current = true;
    this.dieta.historia_clinica = this.id;

    if(this.dieta_id != undefined) {
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
          this.dieta_service.updateDieta(this.dieta_id, this.dieta).subscribe(
            () => {
              this.location.back();
            }
          )
        }
      })

    } else {

      if(this.currentDieta._id!=undefined) {
        this.currentDieta.fin = this.dieta.inicio;
        this.currentDieta.current = false;
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
            this.dieta_service.updateDieta(this.currentDieta._id, this.currentDieta).subscribe(
              () => {
                this.dieta_service.newDieta(this.dieta).subscribe(
                  () => {
                    this.location.back();
                  }
                )
              }
            )
          }
        })
        
      } else {
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
            this.dieta_service.newDieta(this.dieta).subscribe(
              () => {
                this.location.back();
              }
            )
          }
        })
        
      }
    }
  }

  cancel() {
    if(this.selected.descripcion!=this.descripcionControl || this.selected.tipo!=this.tipoControl || this.dieta.inicio != this.fechaConrol) {
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
    if(this.selected.descripcion!=this.descripcionControl || this.selected.tipo!=this.tipoControl || this.dieta.inicio != this.fechaConrol) {
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
   //Validation
 
   isBefore(a:string) {
     if(a) {
       return moment(this.today).isBefore(a);
     }
   }
 
   outOfRange(a:string) {
     return moment(a).isBefore(moment('01/01/1920'));
   }

}
