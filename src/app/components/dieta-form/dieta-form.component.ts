import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { Dieta } from 'src/app/models/Dieta';
import { PlantillaDietaService } from 'src/app/services/plantilla-dieta.service';
import { PlantillaDieta } from 'src/app/models/PlantillaDieta';
import { Usuario } from 'src/app/models/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DietaService } from 'src/app/services/dieta.service';

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
  selected:PlantillaDieta;

  constructor(private auth_service: AuthenticationService, private plantilla_dieta_service:PlantillaDietaService, private dieta_service:DietaService, private location:Location, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.auth_service.currentUser.subscribe(x => {this.currentUser = x});
    this.id = this.activatedRoute.snapshot.params['id'];
    this.dieta_id = this.activatedRoute.snapshot.params['dieta_id'];

    if(this.dieta_id!=undefined) {
      this.getDieta(this.dieta_id);  
    }

    this.getCurrentDieta(this.id)

    this.getPlantillaDietaList(this.auth_service.currentUserValue.organizacion._id);
  }

  getCurrentDieta(id:string) {
    this.dieta_service.getCurrentDieta(this.dieta_id).subscribe(
      result => {
        this.currentDieta = result;
      }
    )
  }

  getDieta(id:string) {
    this.dieta_service.getDieta(this.id).subscribe(
      result => {
        this.dieta = result;
        this.selected.tipo = this.dieta.tipo;
        this.selected.descripcion = this.dieta.descripcion;
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

    if(this.dieta_id != undefined) {
      this.dieta_service.updateDieta(this.dieta_id, this.dieta).subscribe(
        () => {
          //here goes confirmation message
        }
      )
    } else {

      if(this.currentDieta!=undefined) {
        this.currentDieta.fin = this.dieta.inicio;
        this.dieta_service.updateDieta(this.currentDieta._id, this.currentDieta).subscribe(
          () => {
            this.dieta_service.newDieta(this.dieta).subscribe(
              () => {
                //here goes confirmation message
              }
            )
          }
        )
      }
    }
  }

  cancel() {
    this.location.back();
  }

  back() {
    this.location.back();
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
