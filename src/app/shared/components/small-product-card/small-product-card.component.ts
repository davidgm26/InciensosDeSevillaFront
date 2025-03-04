import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.interface';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-small-product-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './small-product-card.component.html',
  styleUrls: ['./small-product-card.component.css'],
  providers: [MessageService]
})
export class SmallProductCardComponent {
  @Input() producto!: Producto;
  readonly imagenPorDefecto: string = 'defecto.jpg';

  constructor(
    private carritoService: CarritoService,
    private messageService: MessageService
  ) { }


  agregarAlCarrito() {
    if(localStorage.getItem('token') == null) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Debes iniciar sesión para agregar productos al carrito', life: 2000});
    }else{
      this.carritoService.agregarProductoACarrito(this.producto);
      this.messageService.add({severity:'success', summary:'Producto añadido', detail:'Producto añadido al carrito',life: 2000});
    }
  }

  obtenerImagenProducto(): string {
    if (!this.producto.imagen || this.producto.imagen.trim() === '') {
      return this.imagenPorDefecto;
    }
    return this.producto.imagen;
  }


  cargarDefault(event: any): void {
    event.target.src = this.imagenPorDefecto;
  }
}
