import { Component, OnInit } from '@angular/core';
import { Consulta } from '../../models/Consulta';
import { ConsultasService } from '../../services/consultas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';


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

  constructor(private consulta_service: ConsultasService, 
              private activatedRoute:ActivatedRoute, 
              private router: Router,
              private location:Location) { }

  ngOnInit(): void {
    this.id_patient = this.activatedRoute.snapshot.params['id_patient'];
    this.id = this.activatedRoute.snapshot.params['id'];
    this.name = this.activatedRoute.snapshot.params['name'];
    this.last = this.activatedRoute.snapshot.params['last'];
    this.consulta.historia_clinica._id = this.id;
  }

  saveConsulta() {
    if(this.consulta.altura != '' && this.consulta.peso != '') {

      this.consulta_service.newConsultas(this.consulta, this.id)
      .subscribe(() =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Datos guardados',
          showConfirmButton: false,
          timer: 1500
          })
        setTimeout(() =>  this.router.navigate(['consultas/' + this.id_patient]), 1000)
        }
      );
    }
  }
       

  cancel(){
    
    if(this.consulta.altura != '' || this.consulta.peso != '' || this.consulta.fecha != '') {
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

    //this.router.navigate(['consultas/' + this.id_patient ]);  
  }

}
