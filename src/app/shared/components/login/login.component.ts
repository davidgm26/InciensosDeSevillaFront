import { Component } from '@angular/core';
import { FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Message } from 'primeng/message';
import { NgIf } from '@angular/common';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,PasswordModule,InputTextModule,IftaLabelModule,Message,NgIf,Toast, MessageModule],
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

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
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

  onSubmit() {
    this.loginRequest = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(this.loginRequest).subscribe(
        (resp) => {
          localStorage.setItem('token', resp.token);
          this.messageService.add({severity:'success', summary: 'Login Exitoso', detail: 'Has iniciado sesión correctamente'});
          this.router.navigate(['/home']);
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Error de Login', detail: error.error.message});
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



}
