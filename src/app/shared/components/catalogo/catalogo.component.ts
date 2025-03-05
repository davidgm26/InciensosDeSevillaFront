import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Producto } from '../../models/producto.interface';
import { TarjetaProductoComponent } from "../tarjeta-producto/tarjeta-producto.component";
import { ProductoService } from '../../services/producto.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, NgFor, TarjetaProductoComponent, NavbarComponent,Toast,SpinnerComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  providers: [MessageService]
})
export class CatalogoComponent implements OnInit {

  categoriaId: string | null = null;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = []; // Productos a mostrar en la página actual
  loadingData: boolean = true;
  
  // Configuración de paginación
  paginaActual: number = 1;
  elementosPorPagina: number = 8; // 4 productos por fila * 2 filas
  totalPaginas: number = 1;

  constructor(private productoService: ProductoService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoriaId = params.get('id');
      this.cargarProductos(this.categoriaId);
    });
  }

  cargarProductos(id: string | null = null) {
    if (id) {
      this.loadingData = true;
      this.productoService.getAllProductosActivos(id).subscribe(
        (res) => {
          this.productos = res.sort((a,b) => a.id - b.id);
          this.calcularTotalPaginas();
          this.cambiarPagina(1); // Iniciar en la primera página
          this.loadingData = false;
        },
        (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los productos'
          });
          this.loadingData = false;
        }
      );
    } else {
      console.error("Error al cargar productos");
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Categoría no especificada'
      });
      this.loadingData = false;
    }
  }

  calcularTotalPaginas(): void {
    this.totalPaginas = Math.ceil(this.productos.length / this.elementosPorPagina);
  }

  cambiarPagina(numeroPagina: number): void {
    if (numeroPagina < 1 || numeroPagina > this.totalPaginas) {
      return;
    }
    
    this.paginaActual = numeroPagina;
    const indiceInicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const indiceFin = Math.min(indiceInicio + this.elementosPorPagina, this.productos.length);
    
    this.productosFiltrados = this.productos.slice(indiceInicio, indiceFin);
  }

  irAPaginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.cambiarPagina(this.paginaActual - 1);
    }
  }

  irAPaginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.cambiarPagina(this.paginaActual + 1);
    }
  }

  // Genera un array con los números de página a mostrar
  obtenerPaginas(): number[] {
    const paginas: number[] = [];
    const maxPaginasMostradas = 5;
    
    if (this.totalPaginas <= maxPaginasMostradas) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= this.totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      // Mostrar un subconjunto de páginas centrado en la página actual
      let inicio = Math.max(1, this.paginaActual - 2);
      let fin = Math.min(this.totalPaginas, inicio + maxPaginasMostradas - 1);
      
      // Ajustar el inicio si estamos cerca del final
      if (fin === this.totalPaginas) {
        inicio = Math.max(1, fin - maxPaginasMostradas + 1);
      }
      
      for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
      }
    }
    
    return paginas;
  }
}
