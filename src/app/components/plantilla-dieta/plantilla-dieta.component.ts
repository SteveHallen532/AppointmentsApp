import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantillaDieta } from 'src/app/models/PlantillaDieta';
import { PlantillaDietaService } from 'src/app/services/plantilla-dieta.service';

@Component({
  selector: 'app-plantilla-dieta',
  templateUrl: './plantilla-dieta.component.html',
  styleUrls: ['./plantilla-dieta.component.css']
})
export class PlantillaDietaComponent implements OnInit {
  id:string;
  plantillaDieta:PlantillaDieta;
  loading = true;

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private plantilla_dieta_service:PlantillaDietaService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getPlantillaDieta(this.id);
  }

  getPlantillaDieta(id:string) {
    this.plantilla_dieta_service.getPlantillaDieta(this.id).subscribe(
      result => {
        this.plantillaDieta = result;
        this.loading = false;
      }
    )
  }

  goToForm(id:string) {
    this.router.navigate(['plantilla-dieta-form/', this.plantillaDieta._id]);
  }

  back() {
    this.router.navigate(['plantilla-dieta-list']);
  }

}
