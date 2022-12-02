import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group({
    email: ['mirpueba@algo.com', [Validators.required, Validators.email]],
    password: ['asdasd', [Validators.required, Validators.minLength(6)]],
    name: ['prueba', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authSrv: AuthService
  ) {}

  registrar() {
    const { email, name, password } = this.registerForm.value;

    this.authSrv.newUser(email, name, password).subscribe((ok) => {
      if (ok === true) {
        this.route.navigateByUrl('/dashboard');
      } else {
        // mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: ok,
        });
      }
    });
  }
}
