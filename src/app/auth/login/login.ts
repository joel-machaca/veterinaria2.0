import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/authService';
import { Router } from '@angular/router';
import { Rol } from '../../core/models/perfil';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (this.form.invalid) {
      Swal.fire('Campos incompletos', 'Por favor completa los campos obligatorios.', 'warning');
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.auth.login(email!, password!).subscribe({
      next: (perfil) => {
        this.auth.guardarSesion(perfil);
        localStorage.setItem('duenoId', perfil.id!.toString());
        let destino = '/';
        if (perfil.rol === Rol.admin) {  
          destino = '/admin/mascotas'; 
        } else if (perfil.rol === Rol.cliente) {
          destino = '/cliente/mascotas'; 
        }

        Swal.fire('Bienvenido', `Hola ${perfil.nombre}`, 'success');
        this.router.navigate([destino]);
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Credenciales incorrectas o usuario no encontrado.', 'error');
      }
    });
  }

}
