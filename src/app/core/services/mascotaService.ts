
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mascota, MascotaResponse } from '../models/mascotas/mascota';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private apiUrl = 'http://localhost:8080/api/mascotas';

  constructor(private http: HttpClient) {}

  // 🟢 Crear nueva mascota
  crearMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(this.apiUrl, mascota);
  }

  // 🟡 Actualizar mascota
  actualizarMascota(id: number, mascota: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.apiUrl}/${id}`, mascota);
  }

  // 🔵 Listar todas las mascotas (admin)
  listarMascotas(): Observable<MascotaResponse[]> {
    return this.http.get<MascotaResponse[]>(this.apiUrl);
  }

  // 🟣 Listar mascotas por dueño
  listarPorDueno(duenoId: number): Observable<MascotaResponse[]> {
    return this.http.get<MascotaResponse[]>(`${this.apiUrl}/dueno/${duenoId}`);
  }

  // 🔴 Eliminar mascota
  eliminarMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerDetalleMascota(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}/detalle`);
}
  
}
