import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFechaFormato',
})
export class FechaFormatoPipe implements PipeTransform {

  transform(value: string | Date | null | undefined, tipo: 'anio' | 'mes' | 'dia' = 'anio'): string {
    if (!value) return '';

    const fecha = new Date(value);
    if (isNaN(fecha.getTime())) return '';

    const anio = fecha.getFullYear().toString();
    const dia = fecha.getDate().toString().padStart(2, '0');

    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const mes = meses[fecha.getMonth()];

    switch (tipo) {
      case 'anio':
        return anio;
      case 'mes':
        return mes;
      case 'dia':
        return dia;
      default:
        return '';
    }
  }

}
