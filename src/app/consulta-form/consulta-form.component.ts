import { Component, OnInit } from '@angular/core';
import { Consulta } from '../models/Consulta';
import { ConsultasService } from '../services/consultas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-consulta-form',
  templateUrl: './consulta-form.component.html',
  styleUrls: ['./consulta-form.component.css']
})
export class ConsultaFormComponent implements OnInit {

  id: string = '';
  id_patient = '';
  name: string = '';
  last: string = '';
  /*peso: string;
    altura: string;
    _id_historia_clinica: string;*/

  consulta: Consulta = new Consulta;

  constructor(private consulta_service: ConsultasService, private activatedRoute:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_patient = this.activatedRoute.snapshot.params['id_patient'];
    this.id = this.activatedRoute.snapshot.params['id'];
    this.name = this.activatedRoute.snapshot.params['name'];
    this.last = this.activatedRoute.snapshot.params['last'];
    this.consulta.historia_clinica._id = this.id;
  }

  saveConsulta() {
    console.log(this.id)
    if(this.consulta.altura != '' && this.consulta.peso != '') {

      this.consulta_service.newConsultas(this.consulta, this.id)
      .subscribe(() =>{
        this.router.navigate(['consultas/' + this.id_patient]);  
        }
      );
    }
  }

  cancel(){
    this.consulta.altura = '';
    this.consulta.peso = '';
    this.router.navigate(['consultas/' + this.id_patient ]);  
  }

}
