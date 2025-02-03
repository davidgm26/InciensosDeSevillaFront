import { Component } from '@angular/core';
import { FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { LoginRequest } from '../../shared/models/login-request';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink,PasswordModule,InputTextModule,IftaLabelModule,Message],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hidePassword: boolean = true;
  loginRequest!: LoginRequest;
  loginForm!: FormGroup;
  errorUsername: string = '';
  errorPassword: string = '';
  logged: boolean = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }


  crearFormulario() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    debugger;
    this.loginRequest = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(this.loginRequest).subscribe(
        (resp) => {
          localStorage.setItem('token', resp.token);
          console.log(resp);
        },
        (error) => {
          console.log("Error: ", "Usuario o contraseña incorrectos");
        })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }



}
