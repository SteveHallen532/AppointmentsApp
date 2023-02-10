import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AppointmentsFormComponent } from './components/appointments-form/appointments-form.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnouncementsComponent } from './components/anouncements/anouncements.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { ConsultaFormComponent } from './components/consulta-form/consulta-form.component';
import { MedicalHistoryFormComponent } from './components/medical-history-form/medical-history-form.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { FilterPatientsPipe } from './pipes/filter-patients.pipe';
import { SellectPatientComponent } from './components/sellect-patient/sellect-patient.component';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './components/login/login.component';
import { FilterByDatePipe } from './pipes/filter-by-date.pipe';
import {DateValidatorDirective} from 'src/app/validations';


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
    LoginComponent,
    FilterByDatePipe,
    DateValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
