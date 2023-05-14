import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dieta } from 'src/app/models/Dieta';
import { HistoriaClinica } from 'src/app/models/HistoriaClinica';
import { DietaService } from 'src/app/services/dieta.service';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';
import * as moment from 'moment';

@Component({
  selector: 'app-diets-history',
  templateUrl: './diets-history.component.html',
  styleUrls: ['./diets-history.component.css']
})
export class DietsHistoryComponent implements OnInit {

  constructor(private dieta_service:DietaService, private router:Router, private activatedRoute:ActivatedRoute, private hc_service:MedicalHistoryService) { }

  loading = true;
  hc_id = '';
  hc:HistoriaClinica;
  dietaList:Dieta[];
  date = '';
  date2 = '';

  ngOnInit(): void { 
    this.hc_id = this.activatedRoute.snapshot.params['id'];

    this.getMedicalHistory();
    this.getDietaList();
    console.log('hc, ', 'id ', this.hc_id, this.hc)
    
  }

  getDietaList() {
    this.dieta_service.getDietaList(this.hc_id).subscribe(
      result => {
        this.dietaList = result;
        this.formatDates();
        this.loading = false;
      }
    )
  }

  formatDates() {
    this.dietaList.forEach(e => e.inicio = moment(e.inicio).format('DD/MM/YYYY'));
    this.dietaList.forEach(e => {
      if(e.fin != '') {
      e.fin = moment(e.fin).format('DD/MM/YYYY')
    } else {
      e.fin = 'Actual';
    }
  });

  }

  getMedicalHistory() {
    this.hc_service.getMedicalHistoryFromId(this.hc_id).subscribe(
      result => {this.hc = result}
    )
  }

  goToDieta(id:string) {
    this.router.navigate(['/history/dieta/', id]);
  }

  back() {
    this.router.navigate(['/dieta/', this.hc_id, this.hc.patient])
  }

}
