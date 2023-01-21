import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { FormsModule } from '@angular/forms';
import { AnouncementsComponent } from './anouncements/anouncements.component';
import { HttpClientModule } from '@angular/common/http';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { MedicalHistoryFormComponent } from './medical-history-form/medical-history-form.component';
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import { FilterPatientsPipe } from './pipes/filter-patients.pipe';
import { SellectPatientComponent } from './sellect-patient/sellect-patient.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    CalendarComponent,
    AppointmentsComponent,
    AppointmentsFormComponent,
    PatientsListComponent,
    PatientInfoComponent,
    PatientFormComponent,
    MedicalHistoryComponent,
    AnouncementsComponent,
    ConsultasComponent,
    ConsultaFormComponent,
    MedicalHistoryFormComponent,
    AppointmentsListComponent,
    FilterPatientsPipe,
    SellectPatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
