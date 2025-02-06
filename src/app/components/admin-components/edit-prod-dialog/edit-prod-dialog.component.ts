import { Component, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ProductoService } from '../../../shared/services/producto.service';
import { Producto } from '../../../shared/models/producto';
import { Select } from 'primeng/select';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-prod-dialog',
  imports: [ButtonModule, Dialog, InputTextModule, ReactiveFormsModule, NgIf, Select],
  templateUrl: './edit-prod-dialog.component.html',
  styleUrls: ['./edit-prod-dialog.component.css']
})
export class EditProdDialogComponent implements OnInit {

  editForm!: FormGroup;
  producto!: Producto;
  listaCategorias: any[] = [];
  soloLectura: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productoServicio: ProductoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  get formControls() {
    return this.editForm.controls;
  }

  ngOnInit(): void {
    console.log("goal");
    if (this.config.data && this.config.data.producto) {
      this.producto = this.config.data.producto;
    }  }

  onSubmit(): void {
  }

}
