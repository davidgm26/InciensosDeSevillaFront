import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request.interface';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Message } from 'primeng/message';
import { NgIf } from '@angular/common';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { Dialog } from 'primeng/dialog';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PasswordModule, InputTextModule, IftaLabelModule, Message, NgIf, Toast, MessageModule, Dialog, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  hidePassword: boolean = true;
  loginRequest!: LoginRequest;
  loginForm!: FormGroup;
  errorUsername: string = '';
  errorPassword: string = '';
  logged: boolean = true;
  errorMessage: string = '';
  correoForm!: FormGroup;
  visible: boolean = false;
  activo!:boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.correoForm = this.fb.group({
      correo: ['']
    })
  }

  get formControls() {
    return this.loginForm.controls;
  }

  crearFormulario() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  comprobarSiActivo(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authService.obtenerUsuario().subscribe(
        resp => {
          this.activo = resp.activo;
          resolve(resp.activo);
        },
        error => {
          console.error('Error al comprobar si el usuario está activo:', error);
          this.activo = false;
          resolve(false);
        }
      );
    });
  }

  comprobarValidacion() {
    this.authService.comprobarValidacionUsuario().subscribe(
      async (resp) => {
        if(this.authService.esAdmin()){
          this.router.navigate(['/admin/productos']);
        } else {
          // Esperar a que se complete la comprobación de si el usuario está activo
          const estaActivo = await this.comprobarSiActivo();
          
          if(estaActivo){
            this.messageService.add({ severity: 'success', summary: 'Login Exitoso', detail: 'Has iniciado sesión correctamente' });
            this.router.navigate(['/home']);          
          } else {
            this.messageService.add({ severity: 'error', summary: 'Cuenta Baneada', detail: 'El acceso de esta cuenta a la web ha sido restringido'});
            this.authService.clearToken(); // Limpiar el token si la cuenta está baneada
          }
        }
      },
      (error) => {
        this.authService.clearToken();
        this.messageService.add({ severity: 'error', summary: 'Error de Validación', detail: error.error});
      }
    );
  }

  onSubmit() {
    this.loginRequest = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(this.loginRequest).subscribe(
        (resp) => {
          sessionStorage.setItem('token', resp.token);
          this.comprobarValidacion();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error de Login', detail: error.error.message });
        })
    } else {
      this.loginForm.markAllAsTouched();
      this.setFormErrors();
    }
  }

  setFormErrors() {
    const controls = this.loginForm.controls;
    if (controls['username'].invalid) {
      this.errorUsername = '* El nombre de usuario es obligatorio.';
    }
    if (controls['password'].invalid) {
      if (controls['password'].errors?.['required']) {
        this.errorPassword = '* La contraseña es obligatoria.';
      } else if (controls['password'].errors?.['minlength']) {
        this.errorPassword = '* La contraseña debe tener al menos 6 caracteres.';
      }
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  showDialog() {
    this.visible = true;
}
reenviarCorreo(){
  this.authService.reenviarCorreo(this.correoForm.value).subscribe(
    resp =>{
      this.messageService.add({severity:'success', summary:'¡Éxito!', detail:'Correo reenviado correctamente'});
      this.visible = false;
    },
    err=>{
      console.log(err);
      this.messageService.add({severity:'error', summary:'¡Error!', detail: 'Correo no encontrado'});
    }
  );
}

}