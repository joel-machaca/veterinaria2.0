export interface Mascota {
    id?: number;
    duenoId: number; 
    nombre: string;
    especie: string;
    sexo: Sexo
    fechaNacimiento?: string; 
    creadoEn?: string;


    nombreMascota?: string;
    especieMascota?: string;
    nombreDueno?: string;
}
export enum Sexo{
    macho='macho',
    hembra='hembra'
}


