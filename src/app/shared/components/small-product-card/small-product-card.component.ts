import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-small-product-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './small-product-card.component.html',
  styleUrls: ['./small-product-card.component.css']
})
export class SmallProductCardComponent {
  @Input() producto!: Producto;
}
