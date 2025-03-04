import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.interface';
import { Router, RouterLink } from '@angular/router';
import { Drawer } from 'primeng/drawer';
import { CarritoService } from '../../services/carrito.service';
import { FilaCarritoComponent } from "../fila-carrito/fila-carrito.component";
import { CrearLineaDto } from '../../models/crear-linea-dto.interface';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

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
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService

  ) {
    effect(() => {
      this.carrito = this.carritoService.getCarrito();
      this.totalCarrito = this.carritoService.calcularCarrito();
      this.carritoService.guardarCarritoEnLocalStorage();
    });
  }

  ngOnInit(): void {
    this.getAllCategorias();
    this.authService.getToken() == null ? this.login = false : this.login = true;
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
    this.router.navigate(['/pago']).then(() => {
      if(this.carrito.length == 0){
        this.messageService.add({severity: 'warn', summary: 'Error', detail: 'Para acceder debe añadir productos a su carrito'});
      }
    });
    sessionStorage.setItem('compra', 'true')
  }
  cerrarSesion(){
    sessionStorage.removeItem('token');
    this.login = false;
    this.loadingService.show();
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }

}
