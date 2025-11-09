import { CitaBase } from "./citaBase";

export interface CitaResumenDto extends CitaBase {
  nombreMascota: string;
  nombreDueno: string;
}