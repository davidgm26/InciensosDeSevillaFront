import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { UserValidationRequest } from '../../../shared/models/userValidationRequest.interface';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-verificacion-mail',
  imports: [ReactiveFormsModule,Toast,Dialog,Button,FormsModule],
  templateUrl: './verificacion-mail.component.html',
  styleUrl: './verificacion-mail.component.css',
  providers: [MessageService]
})
export class VerificacionMailComponent implements OnInit {

  validForm!: FormGroup;
  token!: UserValidationRequest;
  codigo: string[] = ['', '', '', '']; 
  correoForm!: FormGroup;
  visible: boolean = false;
  email: string = '';


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ){

  }

  ngOnInit(){
    this.validForm = this.fb.group({
      token: ['']
    })

    this.correoForm = this.fb.group({
      email: ['']
    })
  }

  get formControls(){
    return this.validForm.controls;
  }

  onSubmit(){
    this.token = this.validForm.value;
    this.authService.validarUsuario(this.token).subscribe(
      res => {
        this.messageService.add({severity:'success', summary:'¡Éxito!', detail:'Usuario validado correctamente'});
        this.router.navigate(['/login']);
            },
      err => {
        this.messageService.add({severity:'error', summary:'¡Error!', detail: err.error});
      }
    )
  }

  showDialog() {
    this.visible = true;
}

  actualizarToken(index: number, event: any) {
    const valor = event.target.value;
    if (valor.match(/^\d$/)) {
      this.codigo[index] = valor;
      if (index < 3) {
        const siguienteInput = document.querySelectorAll('.verification-digit')[index + 1] as HTMLInputElement;
        siguienteInput?.focus();
      }
    } else {
      this.codigo[index] = '';
    }
    this.validForm.patchValue({ token: this.codigo.join('') });
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
