import { Injectable, signal } from '@angular/core';
import { Producto } from '../models/producto.interface';
import { CrearLineaDto } from '../models/crear-linea-dto.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrearPedido } from '../models/crear-pedido.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  baseUrl = environment.baseURL

  constructor(
    private http: HttpClient,
  ) {
    this.cargarCarritoDesdeLocalStorage();
  }

  private carrito = signal<CrearLineaDto[]>([]);

  obtenerToken(){
    return new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    })
    
  }

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
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito()));
    return this.carrito();
  }

  borrarCarrito() {
    this.carrito.set([]);
    sessionStorage.removeItem('carrito');
  }

  calcularCarrito() {
    return this.carrito().reduce((total, l) => total + l.subtotal, 0);
  }

  cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = sessionStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito.set(JSON.parse(carritoGuardado));
    }
  }

  guardarCarritoEnLocalStorage() {
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito()));
  }

  tramitarPedido(direccion: string) {
    let pedido: CrearPedido;
    if(this.carrito().length >= 3){
       pedido = {
        lineasPedidosDto: this.carrito(),
        fecha: new Date(),
        total: this.calcularCarrito(),
        direccionDeEntrega: direccion,
     }
    }else{
       pedido = {
         lineasPedidosDto: this.carrito(),
         fecha: new Date(),
         total: this.calcularCarrito()+4.99,
         direccionDeEntrega: direccion,
      }
    }
   return this.http.post(this.baseUrl+'/api/pedido/new', pedido , { headers: this.obtenerToken()});
  }


}
