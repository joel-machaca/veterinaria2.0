import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CitaEstadoUpdateDto } from '../../../core/models/cita/citaEstadoUpdate';
import { CitaDiagnosticoUpdateDto } from '../../../core/models/cita/citaDiagnosticoUpdateDto';
import { CitaResumenDto } from '../../../core/models/cita/citaResumenDto';
import { CitaService } from '../../../core/services/citaService';
import { TipoEstado } from '../../../core/models/cita/citaBase';
import { FechaFormatoPipe } from '../../../shared/pipes/fechaFormato-pipe';

@Component({
  selector: 'app-citas',
  imports: [ReactiveFormsModule,CommonModule,FechaFormatoPipe],
  templateUrl: './citasAdmin.html',
  styleUrl: './citasAdmin.css',
})
export class CitasAdmin {
  estados=TipoEstado
  citas: CitaResumenDto[] = [];
  mostrarModal = false;
  citaSeleccionadaId: number | null = null;

  formDiagnostico = new FormGroup({
    diagnostico: new FormControl('', Validators.required)
  });

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaService.listarCitasResumen().subscribe({
      next: (data) => {
        this.citas = data.filter(c =>
          c.estado === TipoEstado.pendiente || c.estado === TipoEstado.confirmada
        );
      },
      error: (err) => console.error(err)
    });
  }

  actualizarEstado(id: number, nuevoEstado: TipoEstado) {
    const dto: CitaEstadoUpdateDto = { id, estado: nuevoEstado };
    this.citaService.actualizarEstado(dto).subscribe({
      next: () => this.cargarCitas(),
      error: (err) => console.error(err)
    });
  }

  abrirModalCompletar(id: number) {
    this.citaSeleccionadaId = id;
    this.mostrarModal = true;
    this.formDiagnostico.reset();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.citaSeleccionadaId = null;
  }

  completarCita() {
    if (this.formDiagnostico.invalid || !this.citaSeleccionadaId) return;

    const diagnosticoDto: CitaDiagnosticoUpdateDto = {
      id: this.citaSeleccionadaId,
      diagnostico: this.formDiagnostico.value.diagnostico || ''
    };

    this.citaService.actualizarDiagnostico(diagnosticoDto).subscribe({
      next: () => {
        const estadoDto: CitaEstadoUpdateDto = {
          id: this.citaSeleccionadaId!,
          estado: TipoEstado.completada
        };
        this.citaService.actualizarEstado(estadoDto).subscribe({
          next: () => {
            this.cerrarModal();
            this.cargarCitas();
          },
          error: (err) => console.error(err)
        });
      },
      error: (err) => console.error(err)
    });
  }
}
