import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { AnouncementsComponent } from './anouncements/anouncements.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { MedicalHistoryFormComponent } from './medical-history-form/medical-history-form.component';
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import { SellectPatientComponent } from './sellect-patient/sellect-patient.component';

const routes: Routes = [
  {path:'appointments', component: AppointmentsComponent},
  {path:'appointments-form', component: AppointmentsFormComponent},
  {path:'appointments-form/:id', component: AppointmentsFormComponent},
  {path:'calendar', component: CalendarComponent},
  {path:'home', component: HomeComponent},
  {path:'log-in', component:LogInComponent},
  {path:'medical-history/:id/:id_patient', component: MedicalHistoryComponent},
  {path:'patient-form/:id/:route', component: PatientFormComponent},
  {path:'patient-info/:id', component: PatientInfoComponent},
  {path:'patients-list', component: PatientsListComponent},
  {path:'anouncements', component: AnouncementsComponent},
  {path:'', redirectTo: '/home', pathMatch: 'full' },
  {path:'consulta-form/:id_patient/:id/:name/:last', component:ConsultaFormComponent},
  {path:'consultas/:id', component: ConsultasComponent},
  {path:'medical-history-form/:id/:id_patient', component: MedicalHistoryFormComponent},
  {path:'appointments-list', component: AppointmentsListComponent},
  {path:'appointments-list/:id', component: AppointmentsListComponent},
  {path:'select-patient/:id', component:SellectPatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
