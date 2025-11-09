import { CitaBase } from "./citaBase";

export interface CitaDto extends CitaBase {
  mascotaId: number;
  duenoId: number;
  detalle: string;
  diagnostico: string;
}
