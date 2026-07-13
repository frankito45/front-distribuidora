import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { Modal } from "../../components/modal/modal";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, Modal],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  cerrarmodal(){

  }

  private auth = inject(Auth);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  error = '';

ingresar() {

  this.error = '';

  if (this.form.invalid) {
    return;
  }

  this.auth.login(this.form.getRawValue()).subscribe({

    next: () => {
      // navegar al sistema
    },

    error: (err) => {

      this.error =
        err.error?.message ??
        'Correo o contraseña incorrectos';

    }

  });

}

}