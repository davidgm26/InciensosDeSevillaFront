import { Injectable, signal } from '@angular/core';
import { Producto } from '../models/producto';
import { CrearLineaDto } from '../models/crear-linea-dto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  private carrito = signal<CrearLineaDto[]>([]);

  agregarProductoACarrito(producto: Producto) {
    const productoExistente = this.carrito().find(p => p.idProducto == producto.id);
    if (productoExistente) {
      this.carrito.update(productos => productos.map(l => {
        if (l.idProducto == producto.id) {
          l.cantidad++;
          l.subtotal = l.cantidad * l.precioUnitario;
        }
        return l;
      }));
    } else {
      const dto: CrearLineaDto = {
        idProducto: producto.id,
        cantidad: 1,
        precioUnitario: producto.precio,
        subtotal: producto.precio
      }
      this.carrito.update(productos => [...productos, dto]);
    }
  }

  quitarProductoDeCarrito(producto: Producto) {
    this.carrito.update(productos => productos.filter(p => p.idProducto != producto.id));
  }

  disminuirCantidadProducto(producto: Producto) {
    this.carrito.update(productos => productos.map(l => {
      if (l.idProducto == producto.id) {
        if (l.cantidad > 1) {
          l.cantidad--;
          l.subtotal = l.cantidad * l.precioUnitario;
        } else {
          return null;
        }
      }
      return l;
    }).filter(l => l !== null) as CrearLineaDto[]);
  }

  aumentarCantidadProducto(producto: Producto) {
    this.carrito.update(productos => productos.map(l => {
      if (l.idProducto == producto.id) {
        l.cantidad++;
        l.subtotal = l.cantidad * l.precioUnitario;
      }
      return l;
    }));
  }

  getCarrito() {
    return this.carrito();
  }

  borrarCarrito() {
    this.carrito.set([]);
  }

  calcularCarrito() {
    return this.carrito().reduce((total, l) => total + l.subtotal, 0);
  }
}
