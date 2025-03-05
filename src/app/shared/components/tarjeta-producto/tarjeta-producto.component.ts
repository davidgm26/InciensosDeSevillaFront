import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.interface';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Rating } from 'primeng/rating';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule,RouterLink,Rating,ReactiveFormsModule,FormsModule],
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css'],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class TarjetaProductoComponent implements OnInit{

  readonly imagenPorDefecto: string = 'defecto.jpg';

  constructor(
    private carritoService: CarritoService,
    private messageService: MessageService,
    private authService: AuthService
  ){
    
  }

  @Input() producto!: Producto;
  valoracion!:number;

  ngOnInit(): void {
      
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

  agregarCarrito(producto: Producto) {
    if(this.authService.getToken() == null) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Debes iniciar sesión para agregar productos al carrito', life: 2000});
    }else{
      this.carritoService.agregarProductoACarrito(producto);
      this.messageService.add({severity:'success', summary:'Producto añadido', detail:'Producto añadido al carrito',life: 2000});
    }
  }
}
