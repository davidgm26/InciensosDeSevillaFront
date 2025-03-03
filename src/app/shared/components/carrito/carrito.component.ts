import { Component, effect } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.interface';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
  standalone: true
})
export class CarritoComponent {

  carrito: Producto[] = [];

  constructor(
    private carritoService: CarritoService
  ) {
    effect(() => {
      this.carrito = this.carritoService.getCarrito();
    });
  }

  borrarProducto(producto: Producto){
    this.carritoService.quitarProductoDeCarrito(producto);
  }



}
