import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../models/Patient';

@Pipe({
  name: 'filterPatients'
})
export class FilterPatientsPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    
    if(!items || !filter){
      return items;
    }

    return items.filter(item => {

      return nombreApellidoValidation(filter, item);
      
    })

    
    function nombreApellidoValidation(nombre_apellido_filter:string,patient:Patient):boolean{

      var nombre_apellido = "";
      if(!(patient.nombre==null)){
        nombre_apellido+=patient.nombre.trim();
      }
      if(!(patient.apellido==null)){
        nombre_apellido+=" "+patient.apellido.trim();
      }
      return nombre_apellido.toLowerCase().indexOf(nombre_apellido_filter.trim().toLowerCase()) !== -1;
    
    }

  }

}
