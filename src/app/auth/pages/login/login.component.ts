import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    email: ['pepito@algo.com', [Validators.required, Validators.email]],
    password: ['holasdfsd345', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authSrv: AuthService
  ) {}

  login() {
    //this.route.navigateByUrl('/dashboard');

    // Tomamos los valores del formulario
    const { email, password } = this.miFormulario.value;

    this.authSrv.login(email, password).subscribe((ok) => {
      if (ok === true) {
        this.route.navigateByUrl('/dashboard');
      } 
      else {
        // mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: ok
        })
      }      
    });
  }
}
