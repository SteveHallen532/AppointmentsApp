import { Component, OnInit } from '@angular/core';
import { Consulta } from '../../models/Consulta';
import { ConsultasService } from '../../services/consultas.service';
import { HistoriaClinica } from '../../models/HistoriaClinica';
import { MedicalHistoryService } from '../../services/medical-history.service';
import { ActivatedRoute, Router} from '@angular/router';
import { AppointmentsService } from '../../services/appointments.service';
import { Appointment } from '../../models/Appointment';
import { PatientsService } from '../../services/patients.service';
import { Patient } from '../../models/Patient';
import * as moment from 'moment';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  date1 = '';

  date2 = '';

  loading = true;

  id_patient: string = '';

  patient = new Patient;

  medicalHistory: HistoriaClinica = new HistoriaClinica;

  consultas: Consulta[] = [];

  appointmentss: Appointment[] = [];

  constructor(private patient_service:PatientsService, private appointment_service: AppointmentsService, private router:Router, private activatedRoute: ActivatedRoute, private consultas_service: ConsultasService, private medical_history_service: MedicalHistoryService) { }

  ngOnInit(): void {
    this.id_patient = this.activatedRoute.snapshot.params['id'];    
    this.getMedicalHistory();          
  }

  getPatient(){
    this.patient_service.getPatient(this.id_patient)
    .subscribe(
      result => {
        this.patient = result;
      }
    )
  }          

  getConsultas() {
    this.consultas_service.getConsultas(this.medicalHistory._id)
    .subscribe(
      result =>{
        this.consultas = result;
        this.loading = false;
        this.getAppontments();
      }
    );
  }

  getMedicalHistory() {
    this.medical_history_service.getMedicalHistoryFromPatient(this.id_patient)
    .subscribe(
      result => {
        this.medicalHistory = result;
        this.getConsultas();
      }
    );
  }

  getAppontments() {
    this.appointment_service.getAppointmentsPatient(this.id_patient)
    .subscribe(
      result => {
        this.appointmentss = result;
        this.filterDates(this.appointmentss);
      }
    );
  }

  filterDates(arr:Appointment[]) {
    let now = moment();
    arr = arr.filter(
      appointment => {
       return (moment(appointment.fecha +' '+ appointment.hora))
      .isSameOrAfter(now)
    });
    arr = arr.sort((a:Appointment, b:Appointment) => {
      let momentA = moment(a.fecha +' '+ a.hora).format("YYYY MM DD HH:mm");
      let momentB = moment(b.fecha +' '+ b.hora).format("YYYY MM DD HH:mm"); 
      return moment(momentA).isBefore(momentB) ? -1 : 1; 
    });
    this.appointmentss = arr;
    this.getPatient();
  }

  goToForm() {
    this.router.navigate(['/consulta-form', this.id_patient, this.medicalHistory._id ,this.patient.nombre, this.patient.apellido]);
  }

  goToPatientInfo() {
    this.router.navigate(['/patient-info/', this.id_patient]);
  }

  goToMedicalHistory() {
    this.router.navigate(['/medical-history/', this.medicalHistory._id, this.id_patient])
  }

  goToAppointmentsList(id:string) {
    this.router.navigate(['/appointments-list/', this.id_patient])
  }
}
