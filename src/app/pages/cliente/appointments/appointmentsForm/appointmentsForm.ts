import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../../core/services/citaService';
import { AuthService } from '../../../../core/services/authService';
import { CitaDto } from '../../../../core/models/cita/citaDto';
import { PetsService } from '../../../../core/services/mascotaService';
import { TipoServicio } from '../../../../core/models/cita/citaBase';


@Component({
  selector: 'app-appointments-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './appointmentsForm.html',
  styleUrl: './appointmentsForm.css',
})
export class AppointmentsForm {
  form!: FormGroup;
  mascotas: any[] = [];
  mascotaSeleccionada: any = null;
  horasDisponibles = ['08:00:00','09:00:00', '10:00:00', '11:00:00','14:00:00', '15:00:00', '16:00:00','17:00:00','18:00:00',];
  serviciosCita = Object.values(TipoServicio);

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private authService: AuthService,
    private petsService:PetsService
  ) {}

  ngOnInit() {
    const usuario = this.authService.obtenerUsuario();
    const duenoId = usuario?.id; 

    this.form = this.fb.group({
      mascotaId: ['', Validators.required],
      duenoId: [duenoId, Validators.required],
      servicio: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      detalle: ['', Validators.required],
      diagnostico: [''],
      estado: ['pendiente']
    });

    if (duenoId) {
      this.cargarMascotas(duenoId);
    }
  }

  cargarMascotas(duenoId: number) {
    this.petsService.listarPorDueno(duenoId).subscribe({
      next: (res) => {
        this.mascotas = res;
      },
      error: (err) => {
        console.error('Error al cargar mascotas', err);
      }
    });
  }

  onMascotaChange(id: number) {
    this.mascotaSeleccionada = this.mascotas.find(m => m.id == id);
  }

  registrarCita() {
    if (this.form.invalid) return;

    const cita: CitaDto = this.form.value;
    this.citaService.crearCita(cita).subscribe({
      next: res => {
        alert('✅ Cita registrada correctamente');
        this.form.reset();
      },
      error: err => {
        console.error(err);
        alert('❌ Error al registrar la cita');
      }
    });
  }
}
