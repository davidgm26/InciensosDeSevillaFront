import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { RouterLink } from '@angular/router';
import { Drawer } from 'primeng/drawer';
import { CarritoService } from '../../services/carrito.service';
import { FilaCarritoComponent } from "../fila-carrito/fila-carrito.component";
import { CrearLineaDto } from '../../models/crear-linea-dto';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, Drawer, FilaCarritoComponent,Toast],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService]
})
export class NavbarComponent {

  visible2: boolean = false;

  carrito: CrearLineaDto[] = [];

  listaCategoria: Categoria[] = [];

  totalCarrito!: number;

  login!: boolean;
  
  constructor(
    private categoriaService: CategoriaService,
    private carritoService: CarritoService,
    private messageService: MessageService

  ) {
    effect(() => {
      this.carrito = this.carritoService.getCarrito();
      this.totalCarrito = this.carritoService.calcularCarrito();
      this.carritoService.guardarCarritoEnLocalStorage();
    });
  }

  ngOnInit(): void {
    this.getAllCategorias();
    localStorage.getItem('token') ? this.login = true : this.login = false;
    console.log(this.login);
    
  }

  getAllCategorias() {
    return this.categoriaService.getAllCategorias().subscribe(
      (res) => {
        this.listaCategoria = res;

      },
      (err) => {
        console.log(err);
      }
    );
  }
  abrirCarrito() {
    this.visible2 = !this.visible2;
  }

  tramitarPedido(){
    this.carritoService.tramitarPedido().subscribe(
      (resp) =>{
        this.messageService.add({severity:'success', summary: 'Pedido Tramitado', detail: 'Compra realizada'});
        this.carritoService.borrarCarrito();
        this.totalCarrito = 0;
      },
      (err) =>{
        this.messageService.add({severity:'error', summary: 'Error al tramitar Pedido', detail: 'No se pudo tramitar el pedido'});
        console.log(err);
      }
    )
  }
  cerrarSesion(){
    localStorage.removeItem('token');
    this.login = false;
  }

}
