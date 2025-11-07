import { EstadoCita, Servicio } from './cita';

export interface CitaDto {
  id?: number;
  mascotaId: number;
  duenoId: number;
  servicio: Servicio;
  fecha: string;
  hora: string;
  detalle?: string;
  diagnostico?: string;
  estado: EstadoCita;
  creadoEn?: string;

  nombreMascota?: string;
  especieMascota?: string;
  nombreDueno?: string;
}
