import { Component, OnInit } from '@angular/core';
import { CitaResumenDto } from '../../../core/models/cita/citaResumenDto';
import { CitaResponseDto } from '../../../core/models/cita/citaResponseDto';
import { CitaService } from '../../../core/services/citaService';
import { TipoEstado } from '../../../core/models/cita/citaBase';
import { CommonModule } from '@angular/common';
import { FechaFormatoPipe } from '../../../shared/pipes/fechaFormato-pipe';

@Component({
  selector: 'app-historial',
  imports: [CommonModule,FechaFormatoPipe],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnInit {
  citas: CitaResumenDto[] = [];
  citaSeleccionada: CitaResponseDto | null = null;
  mostrarModal = false;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.citaService.listarCitasResumen().subscribe({
      next: (data) => {
        this.citas = data.filter(c =>
          c.estado === TipoEstado.completada || c.estado === TipoEstado.cancelada
        );
      },
      error: (err) => console.error(err)
    });
  }

  verMas(id: number) {
    this.citaService.obtenerDetalle(id).subscribe({
      next: (data) => {
        this.citaSeleccionada = data;
        this.mostrarModal = true;
      },
      error: (err) => console.error(err)
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.citaSeleccionada = null;
  }
}