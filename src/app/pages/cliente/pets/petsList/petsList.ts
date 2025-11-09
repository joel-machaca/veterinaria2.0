import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../core/services/authService';
import { PetsService } from '../../../../core/services/mascotaService';

import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-pets-list',
  imports: [CommonModule],
  templateUrl: './petsList.html',
  styleUrls: ['./petsList.css'],
})
export class PetsList {
  mascotas: any[] = [];
  duenoId!: number;

  constructor(
    private petsService: PetsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const usuario = this.authService.obtenerUsuario();
    this.duenoId = usuario?.id!;

    if (this.duenoId) {
      this.petsService.listarPorDueno(this.duenoId).subscribe({
        next: (res) => this.mascotas = res,
        error: (err) => console.error('Error al listar mascotas', err)
      });
    }
  }

  verCitasMascota(id: number) {
    this.router.navigate(['/cliente/mascota', id, 'citas']);
  }
}
