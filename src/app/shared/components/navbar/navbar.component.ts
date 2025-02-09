import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { RouterLink } from '@angular/router';
import { Drawer } from 'primeng/drawer';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, Drawer],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  visible2: boolean = false;

  carrito: Producto[] = [];

  listaCategoria: Categoria[] = [];

  login!: boolean;

  constructor(
    private categoriaService: CategoriaService,
    private carritoService: CarritoService

  ) {
    effect(() => {
      this.carrito = this.carritoService.getCarrito();
    });
  }

  ngOnInit(): void {
    this.getAllCategorias();
    localStorage.getItem('token') ? this.login = true : this.login = false;
  }

  borrarProducto(producto: Producto) {
    this.carritoService.quitarProductoDeCarrito(producto);
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
}
