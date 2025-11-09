import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MascotaResponse } from '../../../core/models/mascotas/mascota';
import { PetsService } from '../../../core/services/mascotaService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pets-list',
  imports: [CommonModule],
  templateUrl: './petsListAdmin.html',
  styleUrls: ['./petsListAdmin.css'],
})
export class PetsListAdmin {
  mascotas: MascotaResponse[] = [];
  loading = true;

  constructor(private petsService: PetsService, private router: Router) {}

  ngOnInit(): void {
    this.petsService.listarMascotas().subscribe({
      next: (data) => {
        this.mascotas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar mascotas', err);
        this.loading = false;
      }
    });
  }

  verDetalleMascota(id: number) {
    this.router.navigate(['/admin/mascota', id, 'detalle']);
  }
}
