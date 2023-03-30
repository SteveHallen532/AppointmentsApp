import {Directive} from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import * as moment from 'moment';

@Directive({
    selector: '[dateValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true}]
  })
  export class DateValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
      console.log("ASASD")
      console.log(control);
        console.log('control value',control.value, ' test control value', this.test(control.value))
        return this.test(control.value) == false ? {'incorrectDateFormat': true} : null;
    }

    
    //pattern = new RegExp('/[\d]{2}[/][\d]{2}[/][\d]{4}/');

    test(a:any){
      let lastDayOfMonth = moment(a).endOf('month').format('YYYY-MM-DD');
      return moment(lastDayOfMonth).isBefore(moment(a)) ? false : true;
        //return this.pattern.test(a);
    }
  }