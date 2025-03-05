import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [ReactiveFormsModule,Password,ToastModule,NgIf],
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css'],
  providers: [MessageService]
})
export class FormularioRegistroComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: [2, Validators.required],
      nombre: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      apellidos: ['',[ Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}[A-Za-z]$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const data = this.registerForm.value; 
      this.authService.registroUsuario(data).subscribe(
        (resp) => {
          console.log(resp);
          this.messageService.add({severity:'success', summary: 'Usuario Registrado Con Éxito', detail: 'Se le ha enviado un correo para validar su cuenta'});
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error(error);
          this.messageService.add({severity:'error', summary: 'Error', detail: error.error.detail});
        }
      )
    } else {
      this.messageService.add({severity:'warn', summary: 'Cuidado', detail: 'Formulario inválido'});
    }
  }
}
