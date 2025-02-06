import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductoService } from '../../../shared/services/producto.service';
import { Producto } from '../../../shared/models/producto';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../shared/models/categoria';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { Button } from 'primeng/button';
import { EditProdDialogComponent } from "../edit-prod-dialog/edit-prod-dialog.component";
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-gestion-tabla-productos',
  imports: [TableModule, PaginatorModule, SelectModule, FormsModule, ConfirmDialog, Toast, DynamicDialogModule],
  templateUrl: './gestion-tabla-productos.component.html',
  styleUrls: ['./gestion-tabla-productos.component.css'],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class GestionTablaProductosComponent implements OnInit {

  visible: boolean = false;
  listaProductos: Producto[] = [];
  listaCategorias: Categoria[] = [];
  cols: string[] = [];
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  rowsPerPageOptions: number[] = [5, 10, 20];
  selectedCategoria!: Categoria;
  selectedProducto!: Producto;

  @Output() dialogHide: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private productoServicio: ProductoService,
    private categoriaServicio: CategoriaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
    
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarListaProductos(1);
  }

  cargarCategorias() {
    this.categoriaServicio.getAllCategorias().subscribe(
      resp => {
        this.listaCategorias = resp;
        if(this.listaCategorias.length > 0){
          this.selectedCategoria = this.listaCategorias[0];
        }
      },
      error => {
        console.log("Error al cargar categorias");
      });
  }

  cargarListaProductos(idCategoria: number) {
    if (idCategoria == null) {
      idCategoria = 1;
    }
    this.productoServicio.getAllProductosByCategoria(idCategoria?.toString()).subscribe(
      resp => {
        this.totalRecords = resp.length; 
        this.listaProductos = resp.slice(this.first, this.first + this.rows);
      }
    )
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.cargarListaProductos(this.selectedCategoria.id);
  }

  confirmBorrarProducto(id: number) {
    this.confirmationService.confirm({
      header: 'Eliminar Producto',
      message: '¿Estás seguro de que quieres eliminar este producto?',
      icon: 'pi pi-exclamation-circle',
      acceptButtonStyleClass: 'p-button-success', 
      rejectButtonStyleClass: 'p-button-danger',
      acceptButtonProps: {
        label: 'Eliminar',
        icon: 'pi pi-check',
        size: 'small'
      },
      rejectButtonProps: {
        label: 'Cancelar',
        icon: 'pi pi-times',
        size: 'small'
      },
      accept: () => {
        this.borrarProducto(id);
      } 
    });
  }

  borrarProducto(id: number) {
    this.productoServicio.deleteProducto(id).subscribe({
      next: resp => {
        this.cargarListaProductos(this.selectedCategoria.id);
        this.messageService.add({ severity: 'success', summary: 'Producto eliminado', detail: 'El producto ha sido eliminado correctamente', life: 3000 });
      },
      error: err => {
        console.log("Error al borrar producto con id: " + id);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el producto', life: 3000 });
      }
    });
  }

  cambioCategoria(event: any) {
    this.first = 0;
    this.cargarListaProductos(this.selectedCategoria.id);
  }

  editarProducto(producto: Producto) {
    this.dialogService.open(EditProdDialogComponent, {
      header: 'Editar Producto',
      width: '70%',
      data: {
        producto: producto,
      }
    });
    console.log("!goal");
}
}
