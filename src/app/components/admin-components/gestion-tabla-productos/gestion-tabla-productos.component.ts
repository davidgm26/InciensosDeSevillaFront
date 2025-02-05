import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../shared/services/producto.service';
import { Producto } from '../../../shared/models/producto';
import { NgFor } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { Dialog } from 'primeng/dialog';


@Component({
  selector: 'app-gestion-tabla-productos',
  imports: [TableModule, PaginatorModule],
  templateUrl: './gestion-tabla-productos.component.html',
  styleUrl: './gestion-tabla-productos.component.css'
})
export class GestionTablaProductosComponent implements OnInit {

  listaProductos: Producto[] = [];
  cols: string[] = [];
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  rowsPerPageOptions: number[] = [5, 10, 20];

  constructor(
    private productoServicio: ProductoService,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
      this.cargarListaProductos();
  }
  
  cargarListaProductos() {
    this.productoServicio.getAllProductos().subscribe(
      resp => {
        console.log("cargando");
        this.totalRecords = resp.length; // Asignar el total de registros
        this.listaProductos = resp.slice(this.first, this.first + this.rows); // Paginación manual
      }
    )
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.cargarListaProductos();
  }

  borrarProducto(id: number) {
    this.productoServicio.deleteProducto(id.toString()).subscribe(
      resp => {       
        console.log(resp);
        console.log("Borrando producto con id: " + id);
        this.cargarListaProductos()
      },
      error => {
        console.log("Error al borrar producto con id: " + id);
      }
    )
    
  }

  editarProducto(id: number) {
    this.dialog.visible = true;
    console.log("Editando producto con id: " + id);
    
  }
}
