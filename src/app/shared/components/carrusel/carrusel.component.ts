import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule} from "primeng/tag";
import { Producto } from '../../models/producto.interface';
import { SmallProductCardComponent } from '../small-product-card/small-product-card.component';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule,CarouselModule,ButtonModule,TagModule,SmallProductCardComponent],
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnChanges{

  constructor(
    private productoServicio: ProductoService
  ){}

  currentIndex = 0;
  @Input() productos!: Producto[];

  responsiveOptions: any[] | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productos']) {
      console.log('Productos cambiados:', this.productos);
    }
  }


  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warn';
        case 'OUTOFSTOCK':
            return 'danger';
    }

    return "";
}

}
