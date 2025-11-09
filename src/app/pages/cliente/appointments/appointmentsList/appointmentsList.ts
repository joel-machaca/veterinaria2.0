import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../../core/services/citaService';
import { AuthService } from '../../../../core/services/authService';
import { CitaResponseDto } from '../../../../core/models/cita/citaResponseDto';
import { CitaResumenDto } from '../../../../core/models/cita/citaResumenDto';
import { TipoEstado } from '../../../../core/models/cita/citaBase';
import { FechaFormatoPipe } from '../../../../shared/pipes/fechaFormato-pipe';


@Component({
  selector: 'app-appointments-list',
  imports: [CommonModule,FechaFormatoPipe],
  templateUrl: './appointmentsList.html',
  styleUrl: './appointmentsList.css',
})
export class AppointmentsList {
  estadoCita=TipoEstado
  citas: CitaResumenDto[] = [];
  citaSeleccionada: CitaResponseDto | null = null;
  cargando = false;

  constructor(
    private citaService: CitaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.obtenerUsuario();
    if (usuario?.id) {
      this.cargarCitas(usuario.id);
    }
  }

  cargarCitas(duenoId: number): void {
    this.cargando = true;
    this.citaService.listarCitasResumenPorDueno(duenoId).subscribe({
      next: (data) => {
        console.log("cargar citas:",data)
        this.citas = data;
        this.cargando = false;
      },
      error: () => (this.cargando = false)
    });
  }

  verDetalle(id: number): void {
    this.citaService.obtenerDetalle(id).subscribe({
      next: (data) => {
        console.log("cargar citas detalles:",data)
        this.citaSeleccionada = data;
      },
      error: (err) => console.error(err)
    });
  }

  cerrarModal(): void {
    this.citaSeleccionada = null;
  }
}
