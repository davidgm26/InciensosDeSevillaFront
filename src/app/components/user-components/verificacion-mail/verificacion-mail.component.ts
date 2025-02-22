import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { UserValidationRequest } from '../../../shared/models/userValidationRequest';

@Component({
  selector: 'app-verificacion-mail',
  imports: [ReactiveFormsModule],
  templateUrl: './verificacion-mail.component.html',
  styleUrl: './verificacion-mail.component.css'
})
export class VerificacionMailComponent implements OnInit {

  validForm!: FormGroup;
  token!: UserValidationRequest;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ){

  }

  ngOnInit(){
    this.validForm = this.fb.group({
      token: ['']
    })
  }

  get formControls(){
    return this.validForm.controls;
  }

  onSubmit(){
    this.token = this.validForm.value;

    debugger;
    this.authService.validarUsuario(this.token).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
   }
}
