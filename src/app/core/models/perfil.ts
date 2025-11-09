

export interface Perfil {
    id?: number;
    nombre: string;
    apellido: string;
    email?: string;
    password?: string;
    telefono?: string;
    rol?: Rol;
}
export enum Rol{
    admin='admin',
    cliente='cliente'
}