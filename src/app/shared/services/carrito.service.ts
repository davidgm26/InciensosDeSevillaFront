import { Injectable, signal } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  private carrito = signal<Producto[]>([]);


  agregarProductoACarrito(producto: Producto){
    this.carrito.update(productos =>[...productos, producto]);
  }

  quitarProductoDeCarrito(producto: Producto){
    this.carrito.update(productos => productos.filter(p => p.id != producto.id));
  }

  getCarrito(){
    return this.carrito();
  }

  borrarCarrito(){
    this.carrito.set([]);
  }

}
