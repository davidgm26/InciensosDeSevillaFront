import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Producto } from '../../models/producto.interface';
import { TarjetaProductoComponent } from "../tarjeta-producto/tarjeta-producto.component";
import { ProductoService } from '../../services/producto.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, NgFor, TarjetaProductoComponent, NavbarComponent,Toast,SpinnerComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  providers: [MessageService]
})
export class CatalogoComponent implements OnInit {

  categoriaId: string | null = null;
  productos: Producto[] = [];
  loadingData: boolean = true;


  constructor(private productoService: ProductoService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.categoriaId = params.get('id');
      this.cargarProductos(this.categoriaId);
    });
  }

  cargarProductos(id: string | null = null) {
    if (id) {
      this.productoService.getAllProductosActivos(id).subscribe(
        (res) => {
          this.productos = res.sort((a,b) => a.id - b.id);
          this.loadingData = false;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.error("Error al cargar productos");
    }

  }

}
