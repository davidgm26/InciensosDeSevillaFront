import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { RouterLink } from '@angular/router';
import { Drawer } from 'primeng/drawer';
import { CarritoService } from '../../services/carrito.service';
import { FilaCarritoComponent } from "../fila-carrito/fila-carrito.component";
import { CrearLineaDto } from '../../models/crear-linea-dto';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, Drawer, FilaCarritoComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
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

  ) {
    effect(() => {
      this.carrito = this.carritoService.getCarrito();
      console.log(this.carritoService.calcularCarrito());
      this.totalCarrito = this.carritoService.calcularCarrito();
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
        alert("Pedido tramitado correctamente");
        this.carritoService.borrarCarrito();
        this.totalCarrito = 0;
      },
      (err) =>{
        alert("Error al tramitar pedido");
        console.log(err);
      }
    )
  }

}
