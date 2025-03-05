import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { AuthService } from '../../../shared/services/auth.service';
import { PedidoService } from '../../../shared/services/pedido.service';
import { ReseniaService } from '../../../shared/services/resenia.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PerfilUsuarioEditarRequest } from '../../../shared/models/perfil-usuario-editar-request.interface';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { PerfilUsuarioResponse } from '../../../shared/models/PerfilUsuarioResponse.interface';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  
  ],
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  perfilUsuario!: PerfilUsuarioResponse;
  loading: boolean = true;
  visible: boolean = false;
  editarForm!: FormGroup;
  estadisticas = {
    totalPedidos: 0,
    totalResenias: 0
  };

  constructor(
    private authService: AuthService,
    private pedidoService: PedidoService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private reseniaService: ReseniaService
  ) {
    this.editarForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarInfo();
    this.cargarEstadisticas();
  }

  cargarInfo() {
    this.loading = true;
    this.authService.getUserProfileInfo().subscribe({
      next: (resp) => {
        this.perfilUsuario = resp;
        this.editarForm.patchValue({
          nombre: this.perfilUsuario.nombre,
          apellidos: this.perfilUsuario.apellidos,
          email: this.perfilUsuario.email,
          telefono: this.perfilUsuario.telefono,
          direccion: this.perfilUsuario.direccion
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.loading = false;
      }
    });
  }

  cerrarEditar(){
    this.visible = false;
  }

  cargarEstadisticas() {
    this.pedidoService.getAllPedidosDeUsuario().subscribe({
      next: (pedidos) => {
        this.estadisticas.totalPedidos = pedidos.length;
      },
      error: (error) => {
        console.error('Error al cargar los pedidos:', error);
      }
    });

    this.reseniaService.obtenerReseniasDeUnUsuario().subscribe({
      next: (resenias) => {
        this.estadisticas.totalResenias = resenias.length;
      },
      error: (error) => {
        console.error('Error al cargar las reseñas:', error);
      }
    });
  }

  get formControls() {
    return this.editarForm.controls;
  }

  showDialog() {
    this.visible = true;
  }

  editarPerfil(){
    this.editarForm = this.fb.group({
      nombre: [this.perfilUsuario.nombre, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellidos: [this.perfilUsuario.apellidos, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: [this.perfilUsuario.email, [Validators.required, Validators.email]],
      telefono: [this.perfilUsuario.telefono, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      direccion: [this.perfilUsuario.direccion, [Validators.required]],
    })
  }

  editar(){
    this.authService.editarPerfil(this.editarForm.value).subscribe(
      (response: any)=> {
        this.messageService.add({severity:'success', summary:'Perfil editado', detail:'Tu perfil ha sido editado correctamente'});
        this.cerrarEditar();
        this.cargarInfo();
      },
      (error)=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error al editar tu perfil'});
      }
    );
  }
}
