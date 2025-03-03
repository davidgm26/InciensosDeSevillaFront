import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent {
  @Input() numeroTarjeta: string = '';
  @Input() nombre: string = '';
  @Input() fechaExpiracion: string = '';
  @Input() cvv: string = '';

  get numeroTarjetaFormateado(): string {
    return this.numeroTarjeta.replace(/\D/g, '') 
      .replace(/(.{4})/g, '$1-') 
      .slice(0, 19) 
      .replace(/-$/, ''); 
  }
}
