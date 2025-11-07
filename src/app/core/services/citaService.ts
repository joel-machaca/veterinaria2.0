import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cita } from '../models/cita';
import { Observable } from 'rxjs';
import { CitaDto } from '../models/citaDto';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private apiUrl = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient) {}

  registrarCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.apiUrl}/registrar`, cita);
  }

  listarPorDueno(duenoId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}?duenoId=${duenoId}`);
  }



  actualizarEstado(id: number, estado: string): Observable<CitaDto> {
    return this.http.patch<CitaDto>(`${this.apiUrl}/${id}/estado?estado=${estado}`, {});
  }

  listarTodas(): Observable<CitaDto[]> {
    return this.http.get<CitaDto[]>(`${this.apiUrl}/todoCita`);
  }

}
