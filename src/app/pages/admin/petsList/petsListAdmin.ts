import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PetsService } from '../../../core/services/mascotaService';

@Component({
  selector: 'app-pets-list',
  imports: [CommonModule],
  templateUrl: './petsListAdmin.html',
  styleUrls: ['./petsListAdmin.css'],
})
export class PetsListAdmin {
  mascotas: any[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.listarMascotas();
  }

  listarMascotas(): void {
    this.cargando = true;
    this.petsService.listarMascotasConDueno().subscribe({
      next: (data) => {
        this.mascotas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar las mascotas';
        this.cargando = false;
      },
    });
  }

}
