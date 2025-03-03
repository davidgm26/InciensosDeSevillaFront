import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductoService } from '../../../shared/services/producto.service';
import { Producto } from '../../../shared/models/producto.interface';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../shared/models/categoria.interface';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { Button } from 'primeng/button';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Dialog } from 'primeng/dialog';
import { NgIf } from '@angular/common';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-gestion-tabla-productos',
  imports: [TableModule, PaginatorModule, SelectModule, ReactiveFormsModule,
     ConfirmDialog, Toast, DynamicDialogModule,Dialog,FormsModule
     ,Button,NgIf,InputText],
  templateUrl: './gestion-tabla-productos.component.html',
  styleUrls: ['./gestion-tabla-productos.component.css'],
  providers: [ConfirmationService, MessageService, DialogService],
  standalone: true
})
export class GestionTablaProductosComponent implements OnInit {

  visible: boolean = false;
  debounceTimer: any;
  listaProductos: Producto[] = [];
  listaProductosFiltrados: Producto[] = [];
  listaProductosOriginal: Producto[] = [];
  listaCategorias: Categoria[] = [];
  cols: string[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  first: number = 0;
  rowsPerPageOptions: number[] = [5, 10, 20];
  selectedCategoria!: Categoria;
  editForm!: FormGroup
  cat!: string;
  selectedProducto : Producto = {
    id: 0,
    nombre: "",
    descripcion: "",
    precio: 0,
    categoria: "",
    totalResenias: 0,
    imagen: "",
    activo: false,
    valoracion: 0    
   } 
  ref: DynamicDialogRef | undefined;
  
  
  @Output() dialogHide: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(
    private productoServicio: ProductoService,
    private categoriaServicio: CategoriaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private fb: FormBuilder
    
  ) { }
  
  get formControls() {
    return this.editForm.controls;
  }
  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarCategorias();
    this.cargarListaProductos(1);
  }

  inicializarFormulario() {
    this.editForm = this.fb.group({
      nombre: [this.selectedProducto.nombre,[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      descripcion: [this.selectedProducto.descripcion,[Validators.required,Validators.pattern('^[a-zA-Z0-]+$')]],
      precio: [this.selectedProducto.precio,[Validators.required,Validators.pattern('^[0-9]+$')]],
      categoria: [this.getCategoriaByName(this.selectedProducto.categoria),[Validators.required]],
    });
  }

  cargarCategorias() {
    this.categoriaServicio.getAllCategorias().subscribe(
      resp => {
        this.listaCategorias = resp;
        if (this.listaCategorias.length > 0) {
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
        this.listaProductos = resp.sort((a, b) => a.id - b.id).slice(this.first, this.first + this.rows);
        this.listaProductosOriginal = resp;
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

  onHide(){
    this.visible = false;
  }


  editarProducto(producto: Producto) { 
    this.selectedProducto = producto;
    this.cat = producto.categoria;
    this.inicializarFormulario();
    this.visible = true;
  }
  onSubmit(){
    this.productoServicio.updateProducto(this.selectedProducto.id.toString(),this.editForm.value).subscribe(
     resp => {
      this.cargarListaProductos(this.selectedCategoria.id);
      this.visible = false;
      this.messageService.add({ severity: 'success', summary: 'Producto editado', detail: 'El producto ha sido editado correctamente', life: 3000 });
      

     },
     error => {
      this.messageService.add({ severity: 'error', summary: 'Error al editar el producto', detail: 'El producto no ha podido ser editado correctamente', life: 3000 });
     }

    );
  }
  getCategoriaByName(nombreCategoria: string): Categoria | null {
    return this.listaCategorias.find(categoria => categoria.nombre === nombreCategoria) || null;
  }

  buscador($event: any) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      const query = $event.target.value.toLowerCase();
      if (query) {
        this.listaProductosFiltrados = this.listaProductosOriginal.filter(producto => producto.nombre.toLowerCase().includes(query));
        this.listaProductos = this.listaProductosFiltrados;
      } else {
        this.cargarListaProductos(this.selectedCategoria.id);
      }
    }, 500);
  }

  cambiarVisibilidad(producto: any, estado: boolean) {
    const index = this.listaProductos.findIndex((p: any) => p.id === producto.id);
    if (index !== -1) {
      this.listaProductos[index].activo = estado;
      this.productoServicio.cambiarVisibilidad(producto.id.toString()).subscribe(
        resp => {
          this.messageService.add({ severity: 'success', summary: 'Visibilidad actualizada', detail: 'La visibilidad del producto ha sido actualizada correctamente', life: 3000 });
        },
        error => {
          console.log("Error al actualizar la visibilidad del producto con id: " + producto.id);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la visibilidad del producto', life: 3000 });
        }
      );
    }
  }
}
