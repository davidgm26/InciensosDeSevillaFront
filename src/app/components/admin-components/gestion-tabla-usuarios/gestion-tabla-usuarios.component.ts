import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { UserService } from '../../../shared/services/user.service';
import { UserResponse } from '../../../shared/models/user-response.interface';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteResponse } from '../../../shared/models/cliente-response.interface';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-gestion-tabla-usuarios',
  templateUrl: './gestion-tabla-usuarios.component.html',
  styleUrls: ['./gestion-tabla-usuarios.component.css'],
  imports:[Toast,TableModule,NgIf,Dialog,Button,ReactiveFormsModule], 
  standalone: true
})
export class GestionTablaUsuariosComponent implements OnInit {
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  editForm!: FormGroup;
  editClienteForm!: FormGroup;
  rowsPerPageOptions: number[] = [5, 10, 20];
  listaUsuarios: UserResponse[] = [];
  visible: boolean = false;
  usuarioSeleccionado: UserResponse = {
    id: 1,
    activo: false,
    username: "",
    rol: ""
  };
  
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.cargarListaUsuarios();
    this.inicializarFormularioAdmin();
    this.inicializarFormularioCliente();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.cargarListaUsuarios();
  }

  cargarListaUsuarios() {
    this.userService.cargarTodosLosUsuarios().subscribe(
      resp => {
        this.listaUsuarios = resp.sort((a, b) => a.id - b.id).slice(this.first, this.first + this.rows); 
      }
    )
  }

  inicializarFormularioAdmin(usuario?: UserResponse){
    this.editForm = this.fb.group({
      nombre: [usuario?.username,Validators.required],
    })
  }

  inicializarFormularioCliente(usuario?: ClienteResponse){
    this.editClienteForm = this.fb.group({
      nombre: [usuario?.nombre,Validators.required],
      apellido: [usuario?.apellidos,Validators.required],
      email: [usuario?.correo,Validators.required],
      telefono: [usuario?.telefono,Validators.required],
      direccion: [usuario?.direccion,Validators.required],
      dni: [usuario?.dni,[Validators.required,Validators.pattern('^[0-9]{8}[A-Za-z]$')]],
      nombreDeUsuario: [usuario?.username,Validators.required],

    })
  }
  

  cambiarEstado(id: number){
    this.userService.cambiarEstado(id).subscribe(
      resp => {
        this.messageService.add({ severity: 'success', summary: 'Estado cambiado', detail: 'El estado del usuario ha sido cambiado correctamente', life: 3000 });
        this.cargarListaUsuarios();
      },
      error => {
        console.log("Error al cambiar el estado del usuario con id: " + id);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar el estado del usuario', life: 3000 });
      }
    );
  }

  get formControls(){
    return this.editForm.controls;
  }

  get formControlsCliente(){
    return this.editClienteForm.controls;
  }

  editarCliente(id: number) {
    this.userService.editarUsuario(id, this.editClienteForm.value).subscribe(
      resp => {
        this.messageService.add({ severity: 'success', summary: 'Cliente editado', detail: 'El cliente ha sido editado correctamente', life: 3000 });
        this.cargarListaUsuarios();
        this.visible = false;
      },
      error => {
        console.log("Error al editar el cliente con id: " + id);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo editar el cliente', life: 3000 });
      }
    );
  }

  editarUsuario(id: number) {
    this.userService.editarUsuario(id, this.editForm.value).subscribe(
      resp => {
        this.messageService.add({ severity: 'success', summary: 'Usuario editado', detail: 'El usuario ha sido editado correctamente', life: 3000 });
        this.cargarListaUsuarios();
        this.visible = false;
      },
      error => {
        console.log("Error al editar el usuario con id: " + id);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo editar el usuario', life: 3000 });
      }
    );
  }

  abrirEditarCliente(usuario:UserResponse) {
    this.usuarioSeleccionado = usuario;
    this.inicializarFormularioCliente(usuario);
    this.visible = true;
  }

  abrirEditarUsuario(usuario:UserResponse) {
    this.usuarioSeleccionado = usuario;
    this.inicializarFormularioAdmin(usuario);
    this.visible = true;
  }

}
