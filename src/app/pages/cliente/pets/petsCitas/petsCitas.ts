import { Component } from '@angular/core';
import { CitaResumenDto } from '../../../../core/models/cita/citaResumenDto';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from '../../../../core/services/citaService';
import { CommonModule } from '@angular/common';
import { FechaFormatoPipe } from '../../../../shared/pipes/fechaFormato-pipe';

@Component({
  selector: 'app-pets-citas',
  imports: [CommonModule,FechaFormatoPipe],
  templateUrl: './petsCitas.html',
  styleUrl: './petsCitas.css',
})
export class PetsCitas {
  mascotaId!: number;
  citas: CitaResumenDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private r:Router,
    private citaService: CitaService
  ) {}

  ngOnInit() {
    this.mascotaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarCitas();
    
  }

  cargarCitas() {
    this.citaService.listarCitasPorMascota(this.mascotaId).subscribe({
      next: (res) => {
        console.log(this.cargarCitas)
        this.citas = res.filter(c => c.estado === 'completada');
      },
      error: (err) => console.error('Error al listar citas', err)
    });
  }
  volver(){
    this.r.navigate(['/cliente/mascotas'])
  }
}
