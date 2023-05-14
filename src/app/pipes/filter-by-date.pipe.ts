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
    } else if(!date) {

      return items.filter(item => {
        return dateValidationEnd(date2, item);  
      })

    } else if(!date2) {

      return items.filter(item => {
        return dateValidationInit(date, item);  
      })

    } else {

      return items.filter(item => {
        return dateValidation(date, date2, item);  
      })

    }

    function dateValidation(date:string, date2:string, item:any):boolean{
     
      if(typeof item === 'object') {
        // Consultas filter
        if(item.hasOwnProperty('fecha')) {
          console.log('item: ', moment(item.fecha), 'filters', moment(date), moment(date2))

          if(moment(moment(item.fecha)).isSameOrAfter(moment(date))  && moment(moment(item.fecha)).isSameOrBefore(moment(date2))) {
            return true;
          }

        // Dietas firter
        } else if(item.hasOwnProperty('inicio')) {
          console.log('its a diet, double dates', 'init', moment(date),moment(moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')), 'dieta', moment(item.inicio, 'DD/MM/YYYY'),'fin',moment(date2).format('DD MM YYYY') ,'dieta', moment(item.fin, 'DD MM YYYY'))
          if(item.fin == 'Actual') {
            if(moment(item.inicio, 'DD/MM/YYYY').isSameOrAfter(moment(date))  && moment(moment().format('DD/MM/YYYY')).isSameOrBefore(moment(date2))) {
              return true;
            }
          } else {
            if(moment(item.inicio, 'DD/MM/YYYY').isSameOrAfter(moment(date))  && moment(item.fin, 'DD/MM/YYYY').isSameOrBefore(moment(date2))) {
              return true;
            }
          }
        }
      
      } else {
        console.log('is not an object')

        if(moment(moment(item)).isSameOrAfter(moment(date))  && moment(moment(item)).isSameOrBefore(moment(date2))) {
          return true;
        }

      }

    }

    function dateValidationInit(date:string, item:any):boolean{
     
      if(typeof item === 'object') {

        if(item.hasOwnProperty('fecha')) {

          if(moment(moment(item.fecha)).isSameOrAfter(moment(date))) {
            return true;
          }

        } else if(item.hasOwnProperty('inicio')) {
          console.log('its a diet, init date')

          if(moment(item.inicio, 'DD/MM/YYYY').isSameOrAfter(moment(date))) {
            return true;
          }
  
        }

      } else {
        console.log('is not an object')

        if(moment(moment(item)).isSameOrAfter(moment(date))) {
          return true;
        }

      }

    }

    function dateValidationEnd(date2:string, item:any):boolean{
     
      if(typeof item === 'object') {

        if(item.hasOwnProperty('fecha')) {

          if(moment(moment(item.fecha)).isSameOrBefore(moment(date2))) {
            return true;
          }

        } else if(item.hasOwnProperty('inicio')) {
          console.log('its a diet, fin date')

          if(item.fin == 'Actual') {
            if(moment(moment().format('DD/MM/YYYY')).isSameOrBefore(moment(date2))) {
              return true;
            }
          } else {
            if(moment(item.fin, 'DD/MM/YYYY').isSameOrBefore(moment(date2))) {
              return true;
            }
          }
        }

      } else {
        console.log('is not an object')

        if(moment(moment(item)).isSameOrBefore(moment(date2))) {
          return true;
        }

      }

    }

  }

}
