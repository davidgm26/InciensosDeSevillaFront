import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ProductoService } from '../../../shared/services/producto.service';
import { Producto } from '../../../shared/models/producto.interface';
import { GestionTablaProductosComponent } from "../gestion-tabla-productos/gestion-tabla-productos.component";
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-gestor-productos',
  imports: [GestionTablaProductosComponent, SpinnerComponent],
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
