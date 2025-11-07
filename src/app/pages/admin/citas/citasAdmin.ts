import { Component, OnInit } from '@angular/core';

import {ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CitaDto } from '../../../core/models/citaDto';
import { Cita, EstadoCita } from '../../../core/models/cita';
import { CitaService } from '../../../core/services/citaService';
import { FechaFormatoPipe } from '../../../shared/pipes/fechaFormato-pipe';

@Component({
  selector: 'app-citas',
  imports: [ReactiveFormsModule,CommonModule,FechaFormatoPipe],
  templateUrl: './citasAdmin.html',
  styleUrl: './citasAdmin.css',
})
export class CitasAdmin {
  estadocita=EstadoCita
  citas: CitaDto[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.listarCitas();
  }

  listarCitas(): void {
    this.cargando = true;
    this.citaService.listarTodas().subscribe({
      next: data => {
        this.citas = data;
        this.cargando = false;
      },
      error: err => {
        this.error = 'Error al cargar las citas';
        console.error(err);
        this.cargando = false;
      }
    });
  }

  marcarCompletada(cita: CitaDto): void {
    if (!cita.id) return;
    this.citaService.actualizarEstado(cita.id, 'completada').subscribe({
      next: () => {
        cita.estado = EstadoCita.completada;
      },
      error: err => console.error('Error al completar la cita', err)
    });
  }

  cancelarCita(cita: CitaDto): void {
    if (!cita.id) return;
    this.citaService.actualizarEstado(cita.id, 'cancelada').subscribe({
      next: () => {
        cita.estado = EstadoCita.cancelada;
      },
      error: err => console.error('Error al cancelar la cita', err)
    });
  }
}
