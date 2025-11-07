import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Mascota, Sexo } from '../../../../core/models/mascota';
import { PetsService } from '../../../../core/services/mascotaService';
import { AuthService } from '../../../../core/services/authService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pets-form',
  imports: [ReactiveFormsModule],
  templateUrl: './petsForm.html',
  styleUrl: './petsForm.css',
})
export class PetsForm {
  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    especie: new FormControl('', Validators.required),
    sexo: new FormControl<Sexo>(Sexo.macho),
    fecha_nacimiento: new FormControl('')
  });

  constructor(private pets: PetsService, private auth: AuthService) {}

  registrarMascota() {
    if (this.form.invalid) {
      Swal.fire('Campos incompletos', 'Completa todos los campos obligatorios.', 'warning');
      return;
    }

    const usuario = this.auth.obtenerUsuario();
    if (!usuario) {
      Swal.fire('Error', 'No se encontró la sesión del usuario.', 'error');
      return;
    }

    const formData = this.form.getRawValue();

    const mascota: Mascota = {
      duenoId: usuario.id!,
      nombre: formData.nombre!,
      especie: formData.especie!,
      sexo: formData.sexo!,
      fechaNacimiento: formData.fecha_nacimiento!
    };
    console.log(mascota)
    this.pets.registrarMascota(mascota).subscribe({
      next: () => Swal.fire('Registro exitoso', 'Mascota registrada correctamente.', 'success'),
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo registrar la mascota.', 'error');
      }
    });
  }
}
