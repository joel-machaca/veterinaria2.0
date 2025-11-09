import { Component } from '@angular/core';
import { Mascota, Sexo } from '../../../../core/models/mascotas/mascota';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetsService } from '../../../../core/services/mascotaService';
import { Router } from '@angular/router';


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

  constructor(
    private petsService: PetsService,
    private router: Router
  ) {}

  guardarMascota() {
    if (this.form.invalid) return;

    const duenoId = Number(localStorage.getItem('duenoId'));  
    if (!duenoId) {
      alert('No se encontró el ID del dueño logueado');
      return;
    }

    const mascota: Mascota = {
      duenoId,
      nombre: this.form.value.nombre!,
      especie: this.form.value.especie!,
      sexo: this.form.value.sexo!,
      fechaNacimiento: this.form.value.fecha_nacimiento!
    };

    this.petsService.crearMascota(mascota).subscribe({
      next: () => {
        alert('Mascota registrada con éxito 🐶');
        this.router.navigate(['/cliente/mascotas']); 
      },
      error: err => {
        console.error(err);
        alert('Error al registrar la mascota');
      }
    });
  }
  volver(){
    this.router.navigate(['cliente/mascota'])
  }
}
