import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from '../models/perfil';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:8080/api/perfiles';
  constructor(private http:HttpClient) {}

  actualizarPerfil(perfil: Perfil): Observable<Perfil> {
    if (!perfil.id) throw new Error('El perfil debe tener un ID');
    return this.http.put<Perfil>(`${this.apiUrl}/${perfil.id}`, perfil);
  }

  obtenerPerfil(id: number): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.apiUrl}/${id}`);
  }
}
