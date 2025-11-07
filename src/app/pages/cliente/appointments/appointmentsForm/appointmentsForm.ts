import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Cita, EstadoCita, Servicio } from '../../../../core/models/cita';

import { AuthService } from '../../../../core/services/authService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetsService } from '../../../../core/services/mascotaService';
import { Mascota } from '../../../../core/models/mascota';
import { CitaService } from '../../../../core/services/citaService';

@Component({
  selector: 'app-appointments-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './appointmentsForm.html',
  styleUrl: './appointmentsForm.css',
})
export class AppointmentsForm {
  horasDisponibles: string[] = [];
  mascotas: Mascota[] = [];
  mascotaSeleccionada?: Mascota;
  serviciosCita=Object.values(Servicio)

  form = new FormGroup({
    mascotaId: new FormControl<number | null>(null, Validators.required),
    servicio:new FormControl('',Validators.required),
    fecha: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
    detalle: new FormControl('')
  });

  constructor(
    private citas: CitaService,
    private auth: AuthService,
    private pets: PetsService
  ) {
    for (let h = 8; h <= 18; h++) {
      this.horasDisponibles.push(`${h.toString().padStart(2, '0')}:00:00`);
    }
  }

  ngOnInit() {
    const usuario = this.auth.obtenerUsuario();
    if (usuario) {
      this.pets.listarPorDueno(usuario.id!).subscribe({
        next: (mascotas) => (this.mascotas = mascotas),
        error: (err) => console.error('Error al cargar mascotas', err)
      });
    }
  }

  onMascotaChange(id: number) {
    this.mascotaSeleccionada = this.mascotas.find(m => m.id === +id);
  }

  registrarCita() {
    if (this.form.invalid) {
      Swal.fire('Campos incompletos', 'Completa todos los campos obligatorios.', 'warning');
      return;
    }

    const usuario = this.auth.obtenerUsuario();
    if (!usuario) {
      Swal.fire('Error', 'No se encontró la sesión del usuario.', 'error');
      return;
    }

    const data = this.form.getRawValue();
    const cita: Cita = {
      duenoId: usuario.id!,
      mascotaId: Number(data.mascotaId!),
      servicio:data.servicio as Servicio,
      fecha: data.fecha!,
      hora: data.hora!,
      detalle: data.detalle || '',
      estado: EstadoCita.pendiente
    };
    console.log(cita)
    this.citas.registrarCita(cita).subscribe({
      next: () => Swal.fire('Cita registrada', 'Tu cita ha sido registrada exitosamente.', 'success'),
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo registrar la cita.', 'error');
      }
    });
  }
}
