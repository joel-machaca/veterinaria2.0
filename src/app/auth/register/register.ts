import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/authService';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Perfil, Rol } from '../../core/models/perfil';
import { CommonModule } from '@angular/common';






@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  form = new FormGroup({
    nombre: new FormControl<string>('',{nonNullable:true ,validators:[ Validators.required]}),
    apellido: new FormControl<string>('',{nonNullable:true ,validators:[ Validators.required]}),
    email: new FormControl<string>('',{nonNullable:true ,validators:[ Validators.required,Validators.email]}),
    password: new FormControl<string>('',{nonNullable:true ,validators:[ Validators.required]}),
    telefono: new FormControl<string>('' ,{nonNullable:true ,validators:[ Validators.required]}),
    rol: new FormControl<Rol>(Rol.cliente)
  })

  constructor(private auth: AuthService, private router: Router) {}

  registrar() {
    if (this.form.invalid) {
      Swal.fire('Campos incompletos', 'Por favor completa todos los obligatorios.', 'warning');
      return;
    }
    const formData =this.form.getRawValue()
    const perfil: Perfil = {
      nombre:formData.nombre,
      apellido:formData.apellido,
      email:formData.email,
      password:formData.password,
      telefono:formData.telefono

    }
    console.log(perfil)
    this.auth.registrar(perfil).subscribe({
      next: () => {
        Swal.fire('¡Registro exitoso!', 'Tu cuenta ha sido creada correctamente.', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo registrar el usuario.', 'error');
      }
    });
  }
  
}