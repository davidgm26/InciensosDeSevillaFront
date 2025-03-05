import { Component, Input, OnInit } from '@angular/core';
import { CrearLineaDto } from '../../../shared/models/crear-linea-dto.interface';
import { ProductoService } from '../../../shared/services/producto.service';
import { Producto } from '../../../shared/models/producto.interface';

@Component({
  selector: 'app-filaResumen',
  templateUrl: './filaResumen.component.html',
  imports: [],
  styleUrls: ['./filaResumen.component.css'],
  standalone: true
})
export class FilaResumenComponent implements OnInit {

  @Input() linea!: CrearLineaDto;
  producto!: Producto;

  constructor(
    private productoService: ProductoService

  ) { }

  ngOnInit(): void {
    this.productoService.getInformacionProducto(this.linea.idProducto.toString()).subscribe(
      (res) => {
        this.producto = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  
}
