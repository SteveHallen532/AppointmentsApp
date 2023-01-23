import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  year: string = moment().locale('es').format('YYYY');
  today: string = moment().locale('es').format('d');
  month: string = moment().locale('es').format('MM');
  template: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    //console.log(this.year, this.month, this.today);
    //console.log(this.countDays(Number(this.month), Number(this.year)));
    //.format('d') para transformar el nombre de dia en numero
    //console.log(moment().locale('es').day(5).format('dddd'))
    this.generateTemplate();
    console.log(this.template);
    //console.log(moment().day(0).format('dddd'))
   
  }

  generateTemplate() {
    let year = Number(this.year);
    let month = Number(this.month);
    let daysOfTheMonth = this.countDays(month, year);
    let currentDayOfMonth = moment().date();

    for(let i = currentDayOfMonth; i <= daysOfTheMonth; i++) {
      if(moment().date(i).format('dddd') != moment().day(0).format('dddd')) {
        this.template.push(moment().date(i).locale('es').calendar(null, {
          sameDay: '[Hoy]',
          nextDay: '[Mañana]',
          nextWeek: 'dddd',
          lastDay: '[Ayer]',
          lastWeek: '[Last] dddd',
          sameElse: 'DD/MM/YYYY'
      }));
      }
    }
  }

  countDays(month: number, year: number) {
    return new Date(month, year, 0).getDate();
  }

  hideList(){}

  goToEditAppointment(){}

  deleteAppointment(){}

}
