import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';
import { Role } from 'src/app/models/role';
import Swal from 'sweetalert2'

@Component({ templateUrl: 'login.component.html',
selector: 'app-login',
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/home']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid 
        if (this.loginForm.invalid) {
            this.error='Por favor ingrese usuario y contraseña'
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data.role===Role.Admin){
                       this.router.navigate(['/home']);
                    }
                    else if(data.role===Role.Atleta){
                        this.router.navigate(['/home']);
                    }
                    else if(data.role===Role.Secretario){
                        this.router.navigate(['/home']);
                    }                   
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

    contactarAdmin(){

        Swal.fire({
            title: 'Bienvenido a TurnosAPP',
            text: 'Concactate con support@turnosapp.com y te ayudaremos.',
            imageUrl: '../../../assets/images/new_logo.PNG',
            imageAlt: 'Custom image',
          });
    }
}
