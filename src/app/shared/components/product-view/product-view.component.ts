import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Rating } from 'primeng/rating';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Resenia } from '../../models/resenia';
import { ComentarioComponent } from "../comentario/comentario.component";
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CarruselComponent, ReactiveFormsModule, SpinnerComponent, Rating, Toast, FormsModule, ComentarioComponent, NgIf],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  providers: [MessageService]
})
export class ProductViewComponent implements OnInit {

  productId!: string;
  producto!: Producto;
  valoracion!: number;
  loading: boolean = true;
  resenias!: Resenia[];
  valoracionNueva: number = 0;
  reseniaNueva: string = '';
  formularioResenia!: FormGroup;
  login!: boolean;

  productosRelacionados!: Producto[];
  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      window.scrollTo(0, 0);
      this.productId = params.get('id')!;
      this.comprobarRegistro();
      this.getInformacionProducto(this.productId);
      this.cargarProductos();
      this.inicializarFormulario();
    }
    );
  }

  getInformacionProducto(id: string) {
    this.productoService.getInformacionProducto(id).subscribe(
      (res) => {
        this.producto = res;
        this.valoracion = this.producto.valoracion;
        this.obtenerResenias();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cargarProductos() {
    this.productoService.getProductosLimitados().subscribe(
      res => {
        this.productosRelacionados = res;
        this.loading = false;
      },
      error => {
      }
    )
  }

  comprobarRegistro() {
    if (localStorage.getItem('token') == null) {
      this.login = false;
    } else {
      this.login = true;
    }
  }

  agregarAlCarrito() {
    if(localStorage.getItem('token') == null) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Debes iniciar sesión para agregar productos al carrito', life: 2000});
    }else{
      this.carritoService.agregarProductoACarrito(this.producto);
      this.messageService.add({severity:'success', summary:'Producto añadido', detail:'Producto añadido al carrito',life: 2000});
    }
  }

  obtenerResenias() {
    this.productoService.getResenias(this.productId.toString()).subscribe({
      next: (res) => {
        this.resenias = res;
      },
      error: (err) => {

      }
    })

  }


  inicializarFormulario() {
    this.formularioResenia = this.fb.group({
      valoracion: [this.valoracionNueva],
      texto: [this.reseniaNueva]
    });
  }


  onSubmit() {
    if (localStorage.getItem('token') == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debes iniciar sesion para poder dejar una reseña' });
      return;
    } else {
      this.productoService.addResenia(this.productId.toString(), this.formularioResenia.value).subscribe({
        next: (res) => {
          this.obtenerResenias();
          this.formularioResenia.reset();
          this.getInformacionProducto(this.productId.toString());
        },
        error: (err) => {
          debugger;
          if (err.status == 401) {
            localStorage.removeItem('token');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe volver a iniciar sesion para dejar una reseña' });
          }
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
          this.formularioResenia.reset();
        }
      });
    }
  }

}
