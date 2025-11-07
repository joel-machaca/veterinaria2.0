import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appEdad',
})
export class EdadPipe implements PipeTransform {

  transform(fechaNacimiento: string | Date | null | undefined): string {
    if (!fechaNacimiento) return '';

    const fecha = new Date(fechaNacimiento);
    if (isNaN(fecha.getTime())) return '';

    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();


    const mes = hoy.getMonth() - fecha.getMonth();
    const dia = hoy.getDate() - fecha.getDate();
    if (mes < 0 || (mes === 0 && dia < 0)) {
      edad--;
    }

    return `${edad} años`;
  }

}
