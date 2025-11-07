import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Perfil } from '../models/perfil';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='http://localhost:8080/api/perfiles'
  private usuarioActual=new BehaviorSubject<Perfil|null>(null);

  constructor (private http:HttpClient){}

  registrar(perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(`${this.apiUrl}/registrar`, perfil);
  }

  login(email: string, password: string): Observable<Perfil> {
    return this.http.post<Perfil>(`${this.apiUrl}/login`, { email, password });
  }

  guardarSesion(perfil: Perfil) {
    this.usuarioActual.next(perfil);
    localStorage.setItem('usuario', JSON.stringify(perfil));
  }

  obtenerUsuario(): Perfil | null {
    const guardado = localStorage.getItem('usuario');
    if (guardado && !this.usuarioActual.value) {
      this.usuarioActual.next(JSON.parse(guardado));
    }
    return this.usuarioActual.value;
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioActual.next(null);
  }

  estaLogeado(): boolean {
    return !!this.obtenerUsuario();
  }
}

