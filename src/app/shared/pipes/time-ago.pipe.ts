import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) return '';

    // Convertir el valor a objeto Date si es string
    let fecha: Date;
    if (typeof value === 'string') {
      fecha = new Date(value);
    } else {
      fecha = value;
    }

    if (isNaN(fecha.getTime())) {
      console.error('Fecha inválida:', value);
      return ''; 
    }

    // Normalizar la fecha para que solo considere día, mes y año
    const fechaNormalizada = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    
    // Normalizar la fecha actual para que solo considere día, mes y año
    const ahora = new Date();
    const ahoraNormalizada = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    
    // Calcular la diferencia en días
    const diferenciaMilisegundos = ahoraNormalizada.getTime() - fechaNormalizada.getTime();
    const diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    // Convertir días a otras unidades de tiempo
    if (diferenciaDias === 0) {
      return 'Hoy';
    } else if (diferenciaDias === 1) {
      return 'Ayer';
    } else if (diferenciaDias < 7) {
      return `Hace ${diferenciaDias} días`;
    } else if (diferenciaDias < 30) {
      const semanas = Math.floor(diferenciaDias / 7);
      return semanas === 1 ? 'Hace 1 semana' : `Hace ${semanas} semanas`;
    } else if (diferenciaDias < 365) {
      const meses = Math.floor(diferenciaDias / 30);
      return meses === 1 ? 'Hace 1 mes' : `Hace ${meses} meses`;
    } else {
      const años = Math.floor(diferenciaDias / 365);
      return años === 1 ? 'Hace 1 año' : `Hace ${años} años`;
    }
  }
}
