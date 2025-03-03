import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date): string {

    if (!value) return '';

    const fecha = value instanceof Date ? value : new Date(value);

    if (isNaN(fecha.getTime())) {
      return ''; 
    }

    const ahora = new Date();
    const diferencia = Math.floor((ahora.getTime() - fecha.getTime()) / 1000);

    const segundosEnMinuto = 60;
    const segundosEnHora = 60 * segundosEnMinuto;
    const segundosEnDia = 24 * segundosEnHora;
    const segundosEnSemana = 7 * segundosEnDia;
    const segundosEnMes = 30 * segundosEnDia;
    const segundosEnAño = 365 * segundosEnDia;


    if (diferencia < segundosEnMinuto) {
      return 'Justo ahora';
    } else if (diferencia < segundosEnHora) {
      return `Hace ${Math.floor(diferencia / segundosEnMinuto)} min`;
    } else if (diferencia < segundosEnDia) {
      return `Hace ${Math.floor(diferencia / segundosEnHora)} h`;
    } else if (diferencia < segundosEnSemana) {
      return 'Hace una semana';
    } else if (diferencia < segundosEnMes) {
      return 'Hace un mes';
    } else if (diferencia < segundosEnAño) {
      return 'Hace un año';
    } else {
      return 'Hace un tiempo';
    }
  }

}
