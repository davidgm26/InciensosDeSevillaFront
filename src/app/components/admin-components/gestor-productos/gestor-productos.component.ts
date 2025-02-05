import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ProductoService } from '../../../shared/services/producto.service';
import { Producto } from '../../../shared/models/producto';
import { GestionTablaProductosComponent } from "../gestion-tabla-productos/gestion-tabla-productos.component";

@Component({
  selector: 'app-gestor-productos',
  imports: [GestionTablaProductosComponent],
  templateUrl: './gestor-productos.component.html',
  styleUrl: './gestor-productos.component.css'
})
export class GestorProductosComponent {

  productos!: any[];
  dataReady: boolean = false;
  headers: any[] = [];
  @Output() productosCargados = new EventEmitter<Producto[]>(); 

  constructor(
    private productoServicio: ProductoService
  ) { }

  ngOnInit() {

  }



}
