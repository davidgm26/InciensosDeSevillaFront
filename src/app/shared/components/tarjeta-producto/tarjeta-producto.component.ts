import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css'],
  providers: []
})
export class TarjetaProductoComponent {


  constructor(
    private carritoService: CarritoService,
    private messageService: MessageService
  ){
    
  }

  @Input() producto!: Producto;

  valoracion = 'valoración';
  valoraciones = 'valoraciones';

  

  cargarDefault():string {
    return "https://inciensosdesevilla.es/175-large_default/incienso-aroma-de-la-cava.jpg";
  }

  agregarCarrito(producto: Producto) {
    if(localStorage.getItem('token') == null) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Debes iniciar sesión para agregar productos al carrito', life: 2000});
    }else{
      this.carritoService.agregarProductoACarrito(producto);
      this.messageService.add({severity:'success', summary:'Producto añadido', detail:'Producto añadido al carrito',life: 2000});
    }
  }






}
