import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  productId!: string;

  producto!: Producto;
  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id')!;
      this.getInformacionProducto(this.productId);
    }
    );
  }

  getInformacionProducto(id:string) {
    this.productoService.getInformacionProducto(id).subscribe(
      (res) => {
        this.producto = res;
        console.log(this.producto);
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
