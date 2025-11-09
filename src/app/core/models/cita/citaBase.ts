export interface CitaBase {
    id?: number;
    servicio: TipoServicio;
    fecha: string;  
    hora: string;   
    estado: TipoEstado;
}

export enum TipoServicio{
    consultaGeneral='Consulta General',
    vacunacion='Vacunación',
    desparasitación='Desparasitación',
    controlDeSalud='Control De Salud',
    cirugia='Cirugía',
}

export enum TipoEstado{
    pendiente='pendiente',
    confirmada='confirmada',
    completada='completada',
    cancelada='cancelada',
}
