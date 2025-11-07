import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../../../core/models/mascota';
import { AuthService } from '../../../../core/services/authService';
import { PetsService } from '../../../../core/services/mascotaService';
import { EdadPipe } from '../../../../shared/pipes/edad-pipe';


@Component({
  selector: 'app-pets-list',
  imports: [CommonModule,EdadPipe],
  templateUrl: './petsList.html',
  styleUrls: ['./petsList.css'],
})
export class PetsList implements OnInit{
  mascotas: Mascota[] = [];

  constructor(private pets: PetsService, private auth: AuthService) {}

  ngOnInit() {
    const usuario = this.auth.obtenerUsuario();
    if (usuario) {
      this.pets.listarPorDueno(usuario.id!).subscribe({
        next: (data) => (this.mascotas = data),
        error: (err) => console.error('Error al obtener mascotas', err)
      });
    }
  }
}
