import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Producto } from '../../models/producto';
import { TarjetaProductoComponent } from "../tarjeta-producto/tarjeta-producto.component";
import { ProductoService } from '../../services/producto.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, NgFor, TarjetaProductoComponent, NavbarComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  categoriaId: string | null = null;
  productos: Producto[] = [];


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
          this.productos = res;
          console.log(this.productos);
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
