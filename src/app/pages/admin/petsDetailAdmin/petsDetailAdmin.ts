import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsService } from '../../../core/services/mascotaService';

import { CommonModule } from '@angular/common';
import { FechaFormatoPipe } from '../../../shared/pipes/fechaFormato-pipe';

@Component({
  selector: 'app-pets-detail-admin',
  imports: [CommonModule,FechaFormatoPipe],
  templateUrl: './petsDetailAdmin.html',
  styleUrl: './petsDetailAdmin.css',
})
export class PetsDetailAdmin {
  detalle: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private r:Router,
    private petsService: PetsService
    
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.petsService.obtenerDetalleMascota(id).subscribe({
      next: data => {
        console.log(data)
        this.detalle = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error al obtener detalle', err);
        this.loading = false;
      }
    });
  }
  volver(){
    this.r.navigate(['admin/mascotas'])
  }
}
