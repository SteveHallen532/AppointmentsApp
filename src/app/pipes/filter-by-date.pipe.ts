import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Consulta } from '../models/Consulta';

@Pipe({
  name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {

  transform(items: any[], date: string, date2:string): unknown {
    if(!items || !date && !date2){
      return items;
    }

    return items.filter(item => {

      return dateValidation(date, date2, item);
      
    })

    function dateValidation(date:string, date2:string, item:any):boolean{
     
      if(typeof item === 'object') {

        if(item.hasOwnProperty('fecha')) {

          if(moment(moment(item.fecha)).isSameOrAfter(moment(date))  && moment(moment(item.fecha)).isSameOrBefore(moment(date2))) {
            return true;
          }

        }

      } else {
        console.log('is not an object')

        if(moment(moment(item)).isSameOrAfter(moment(date))  && moment(moment(item)).isSameOrBefore(moment(date2))) {
          return true;
        }

      }

    }

  }

}
