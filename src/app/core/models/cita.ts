export interface Cita {
    id?: number;
    mascotaId: number;
    duenoId: number;
    servicio:Servicio;
    fecha: string; 
    hora: string;  
    detalle?: string;
    estado: EstadoCita
    creadoEn?: string;
}

export enum EstadoCita{
    pendiente='cancelada',
    confirmada='confirmada',
    completada='completada',
    cancelada='cancelada'
}

export enum Servicio{
    consultaGeneral='Consulta general',
    vacunacion='Vacunación',
    desparasitacion='Desparasitación',
    controlDeSaluda='Control de salud',
    cirugia='Cirugía'
}
