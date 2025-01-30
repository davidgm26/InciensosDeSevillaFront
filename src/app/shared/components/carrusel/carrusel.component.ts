import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {

  currentIndex = 0;
  productos: string []= ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4', 'Producto 5'];

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.productos.length;
  }
  prevSlide(){
    this.currentIndex = (this.currentIndex - 1 + this.productos.length) % this.productos.length;
  }




}
