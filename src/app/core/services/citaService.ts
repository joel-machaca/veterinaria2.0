
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CitaResponseDto } from '../models/cita/citaResponseDto';
import { Observable } from 'rxjs';
import { CitaEstadoUpdateDto } from '../models/cita/citaEstadoUpdate';
import { CitaDiagnosticoUpdateDto } from '../models/cita/citaDiagnosticoUpdateDto';
import { CitaResumenDto } from '../models/cita/citaResumenDto';
import { CitaDto } from '../models/cita/citaDto';


@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient) {}

  crearCita(cita: CitaDto): Observable<CitaResponseDto> {
    return this.http.post<CitaResponseDto>(`${this.apiUrl}`, cita);
  }

  actualizarCita(id: number, cita: CitaDto): Observable<CitaResponseDto> {
    return this.http.put<CitaResponseDto>(`${this.apiUrl}/${id}`, cita);
  }

  actualizarEstado(dto: CitaEstadoUpdateDto): Observable<CitaResponseDto> {
    return this.http.put<CitaResponseDto>(`${this.apiUrl}/estado`, dto);
  }

  actualizarDiagnostico(dto: CitaDiagnosticoUpdateDto): Observable<CitaResponseDto> {
    return this.http.put<CitaResponseDto>(`${this.apiUrl}/diagnostico`, dto);
  }

  listarCitasResumen(): Observable<CitaResumenDto[]> {
    return this.http.get<CitaResumenDto[]>(`${this.apiUrl}/resumen`);
  }

  listarCitasResumenPorDueno(duenoId: number, estados?: string[]): Observable<CitaResumenDto[]> {
    let params = new HttpParams();
    if (estados) estados.forEach(e => params = params.append('estado', e));
    return this.http.get<CitaResumenDto[]>(`${this.apiUrl}/dueno/${duenoId}/resumen`, { params });
  }

  obtenerDetalle(id: number): Observable<CitaResponseDto> {
    return this.http.get<CitaResponseDto>(`${this.apiUrl}/${id}`);
  }

  // 🟢 Listar citas por mascota
listarCitasPorMascota(mascotaId: number): Observable<CitaResumenDto[]> {
  return this.http.get<CitaResumenDto[]>(`${this.apiUrl}/mascota/${mascotaId}/resumen`);
}
}
