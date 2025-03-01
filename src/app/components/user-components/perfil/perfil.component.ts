import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { LoadingService } from '../../../shared/services/loading.service';
import { AuthService } from '../../../shared/services/auth.service';
import { PerfilUsuarioResponse } from '../../../shared/models/PerfilUsuarioResponse.interface';
import { PedidoService } from '../../../shared/services/pedido.service';
import { Dialog } from 'primeng/dialog';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SpinnerComponent,
    Dialog,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RatingModule,
    ToastModule
  ]
})
export class PerfilComponent implements OnInit {
  perfilUsuario!: PerfilUsuarioResponse;
  loading: boolean = true;
  visible: boolean = false;
  editarForm!: FormGroup;

  constructor(
    private authService: AuthService,
    public loadingService: LoadingService,
    private pedidoService: PedidoService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cargarInfo();
  }

  cargarInfo() {
    Promise.resolve().then(() => {
      this.loadingService.show();
    });
    
    this.authService.getUserProfileInfo()
      .pipe(
        finalize(() => {
          Promise.resolve().then(() => {
            this.loadingService.hide();
          });
        })
      )
      .subscribe({
        next: (resp) => {
          this.perfilUsuario = resp;
          this.loading = false;
          this.editarPerfil();
        },
        error: (error) => {
          console.error('Error loading profile:', error);
        }
      });
  }

  get formControls(){
    return this.editarForm.controls;
  }

  abrirEditar() {
    this.visible = true;
  }

  cerrarEditar(){
    this.visible = false;
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
