import { Component } from '@angular/core';
import { Cita, EstadoCita } from '../../../../core/models/cita';
import { AuthService } from '../../../../core/services/authService';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../../core/services/citaService';

@Component({
  selector: 'app-appointments-list',
  imports: [CommonModule],
  templateUrl: './appointmentsList.html',
  styleUrl: './appointmentsList.css',
})
export class AppointmentsList {
  citas: Cita[] = [];
  cargando = true;

  constructor(
    private citasService: CitaService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const usuario = this.auth.obtenerUsuario();
    if (usuario) {
      this.citasService.listarPorDueno(usuario.id!).subscribe({
        next: (data) => {
          this.citas = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar citas', err);
          this.cargando = false;
        }
      });
    } else {
      this.cargando = false;
    }
  }

  estadoClase(estado: EstadoCita) {
    switch (estado) {
      case EstadoCita.pendiente: return 'bg-yellow-100 text-yellow-800';
      case EstadoCita.confirmada: return 'bg-blue-100 text-blue-800';
      case EstadoCita.completada: return 'bg-green-100 text-green-800';
      case EstadoCita.cancelada: return 'bg-red-100 text-red-800';
      default: return '';
    }
  }
}
