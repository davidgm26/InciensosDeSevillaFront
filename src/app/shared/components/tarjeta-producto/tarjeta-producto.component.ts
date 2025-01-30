import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css']
})
export class TarjetaProductoComponent {
  @Input() producto!: Producto;

  valoracion = 'valoración';
  valoraciones = 'valoraciones';


  cargarDefault():string {
    return "https://inciensosdesevilla.es/175-large_default/incienso-aroma-de-la-cava.jpg";
  }
}
