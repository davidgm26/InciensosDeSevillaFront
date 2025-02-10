import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css']
})
export class TarjetaProductoComponent {


  constructor(
    private carritoService: CarritoService,
  ){
    
  }

  @Input() producto!: Producto;

  valoracion = 'valoración';
  valoraciones = 'valoraciones';


  cargarDefault():string {
    return "https://inciensosdesevilla.es/175-large_default/incienso-aroma-de-la-cava.jpg";
  }

  agregarCarrito(producto: Producto) {
    this.carritoService.agregarProductoACarrito(producto);
  }






}
