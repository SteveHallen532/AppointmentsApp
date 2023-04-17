import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dieta } from 'src/app/models/Dieta';
import { Location } from '@angular/common';
import { DietaService } from 'src/app/services/dieta.service';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.css']
})
export class DietaComponent implements OnInit {

  id:string;
  patient_id:string;
  dieta:Dieta;
  dieta_id:string;
  loading = true;

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private dieta_service:DietaService, private location:Location) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.patient_id = this.activatedRoute.snapshot.params['patient_id'];
    this.dieta_id = this.activatedRoute.snapshot.params['dieta_id'];
    if(this.dieta_id!=undefined) {
      this.getDieta(this.dieta_id);
    } else {
      this.getCurrentDieta(this.id);
    }
  }

  getCurrentDieta(id:string) {
    this.dieta_service.getCurrentDieta(this.dieta_id).subscribe(
      result => {
        this.dieta = result;
        this.loading = false;
      }
    )
  }

  getDieta(id:string) {
    this.dieta_service.getDieta(this.id).subscribe(
      result => {
        this.dieta = result;
        this.loading = false;
      }
    )
  }

  //to select new
  goToForm() {
    this.router.navigate(['dieta-form/', this.id]);
  }

  //to edit current
  goToDietaForm() {
    this.router.navigate(['dieta-form/', this.id, this.dieta_id]);
  }
  //must change to if i get here from history of diets
  back() {
    if(this.patient_id!=undefined) {
      this.router.navigate(['/medical-history/', this.id, this.patient_id])
    } // else { ruta de historial cuando la cree }
  }

}
