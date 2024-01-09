import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appointments-app';
  logged : boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,

  ){

  }

  onActivate(componentRef){
    console.log(componentRef)
    if(componentRef instanceof LoginComponent) {
      this.logged = false
    } else { this.logged = true}
  } 

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
