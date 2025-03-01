import { Component, Input } from '@angular/core';
import { Producto } from '../../models/producto.interface';
import { CarritoService } from '../../services/carrito.service';
import { CrearLineaDto } from '../../models/crear-linea-dto.interface';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-fila-carrito',
  imports: [],
  templateUrl: './fila-carrito.component.html',
  styleUrl: './fila-carrito.component.css'
})
export class FilaCarritoComponent {


  constructor(
    private carritoService: CarritoService,
  private productoService: ProductoService
  ){ }

  @Input() linea!: CrearLineaDto;
  producto!: Producto

  ngOnInit(): void {
    this.productoService.getInformacionProducto(this.linea.idProducto.toString()).subscribe(
      (res) => {
        this.producto = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  aumentarCantidad(producto: Producto) {
    this.carritoService.aumentarCantidadProducto(producto);    
  }

  disminuirCantidad(producto: Producto) {
    this.carritoService.disminuirCantidadProducto(producto);
    
  }

  borrarProducto(producto: Producto) {
    this.carritoService.quitarProductoDeCarrito(producto);
  }

}

