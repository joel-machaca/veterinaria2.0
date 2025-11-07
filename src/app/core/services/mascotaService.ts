import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mascota } from '../models/mascota';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private apiUrl = 'http://localhost:8080/api/mascotas';

  constructor(private http: HttpClient) {}

  registrarMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.apiUrl}/registrar`, mascota);
  }

  listarMascotas(): Observable<Mascota[]> {
    console.log(this.http.get<Mascota[]>(this.apiUrl))
    return this.http.get<Mascota[]>(this.apiUrl);
  }


  eliminarMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listarPorDueno(duenoId: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/dueno/${duenoId}`);
  }
  listarMascotasConDueno(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/con-dueno`);
}
}
