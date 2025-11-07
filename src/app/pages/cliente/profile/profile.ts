import { Component } from '@angular/core';
import { Perfil } from '../../../core/models/perfil';
import { AuthService } from '../../../core/services/authService';
import { PerfilService } from '../../../core/services/perfilService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  usuario?: Perfil;
  editando = false;

  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl(''),
  });

  constructor(private auth: AuthService, private perfilService: PerfilService) {}

  ngOnInit() {
    const user = this.auth.obtenerUsuario();
    if (user) {
      this.usuario = user;
      this.form.patchValue({
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
      });
    }
  }

  habilitarEdicion() {
    this.editando = true;
  }

  cancelar() {
    this.editando = false;
    if (this.usuario) {
      this.form.patchValue({
        nombre: this.usuario.nombre,
        email: this.usuario.email,
        telefono: this.usuario.telefono,
      });
    }
  }

  guardar() {
    if (!this.usuario || this.form.invalid) return;
    const formData = this.form.getRawValue();
    const perfilActualizado: Perfil = {
      ...this.usuario,
      nombre: formData.nombre || '',
      email: formData.email || '',
      telefono: formData.telefono || '',
    };

    this.perfilService.actualizarPerfil(perfilActualizado).subscribe({
      next: (res) => {
        this.usuario = res;
        this.auth.guardarSesion(res);
        this.editando = false;
        Swal.fire('Perfil actualizado', 'Los cambios fueron guardados exitosamente.', 'success');
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo actualizar tu perfil.', 'error');
      }
    });
  }
}
