import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Rating } from 'primeng/rating';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule,RouterLink,Rating,ReactiveFormsModule],
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css'],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class TarjetaProductoComponent implements OnInit{


  constructor(
    private carritoService: CarritoService,
    private messageService: MessageService,
    private fb: FormBuilder
  ){
    
  }

  @Input() producto!: Producto;
  valoracionForm!: FormGroup;
  valoracion = 'valoración';
  valoraciones = 'valoraciones';

  ngOnInit(): void {
      this.valoracionForm = this.fb.group({
        value: [this.producto.valoracion]
      })
  }

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
