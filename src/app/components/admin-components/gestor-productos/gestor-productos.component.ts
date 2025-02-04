import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ProductoService } from '../../../shared/services/producto.service';
import { TablaDinamicaComponent } from "../tabla-dinamica/tabla-dinamica.component";
import { Producto } from '../../../shared/models/producto';

@Component({
  selector: 'app-gestor-productos',
  imports: [TablaDinamicaComponent],
  templateUrl: './gestor-productos.component.html',
  styleUrl: './gestor-productos.component.css'
})
export class GestorProductosComponent {

  productos!: Producto[];
  dataReady: boolean = false;
  @Output() productosCargados = new EventEmitter<Producto[]>(); 

  constructor(
    private productoServicio: ProductoService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    debugger;
    this.productoServicio.getAllProductos().subscribe(
      (resp) => {
        debugger;
        this.productos = resp;
        this.dataReady = true;
        this.productosCargados.emit(this.productos);
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      });
  }

isImageUrl(value: any): boolean {
  return typeof value === 'string' &&
    (value.startsWith('http') || value.startsWith('data:image'));
}

}
