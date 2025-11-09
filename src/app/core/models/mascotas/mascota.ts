import { Perfil } from "../perfil";

export interface Mascota {
  id?: number;
  duenoId: number;
  nombre: string;
  especie: string;
  sexo: string;
  fechaNacimiento: string;
}

export interface MascotaResponse {
  id: number;
  nombre: string;
  especie: string;
  sexo: string;
  fechaNacimiento: string;
  dueno: Perfil;
}
export enum Sexo{
    macho='macho',
    hembra='hembra'
}


