import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Rating } from 'primeng/rating';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CarruselComponent, SpinnerComponent, Rating],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  productId!: string;

  producto!: Producto;

  productosRelacionados!: Producto[];
  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      window.scrollTo(0, 0);
      this.productId = params.get('id')!;
      this.getInformacionProducto(this.productId);
      this.cargarProductos();
    }
    );
  }

  getInformacionProducto(id: string) {
    this.productoService.getInformacionProducto(id).subscribe(
      (res) => {
        this.producto = res;
        console.log(this.producto);
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
      },
      error => {
        console.error("Eror al realizar la carga de productos");

      }
    )
  }


}
