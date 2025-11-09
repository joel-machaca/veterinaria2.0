import { CitaBase } from "./citaBase";

export interface CitaResponseDto extends CitaBase {
    nombreMascota: string;
    especieMascota: string;
    razaMascota:string
    sexoMascota:string;
    fechaNacimiento:string;
    nombreDueno: string;
    emailDueno: string;
    telefonoDueno: string;
    detalle: string;
    diagnostico: string;
}