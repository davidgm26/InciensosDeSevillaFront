import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarjetaComponent } from "../tarjeta/tarjeta.component";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-formulario-pago',
  imports: [ButtonModule, StepperModule, NavbarComponent, ReactiveFormsModule, TarjetaComponent,InputGroupModule,
     InputGroupAddonModule, InputTextModule,FormsModule,MessageModule, NgIf,Toast],
  templateUrl: './formulario-pago.component.html',
  styleUrl: './formulario-pago.component.css',
  standalone: true,
  providers: [MessageService]
})
export class FormularioPagoComponent implements OnInit {


  datosDePago!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.inicializarFormularioPago();
  }

  verificarDatosPago(activateCallback: any) {
    debugger ;
    console.log("paga");
    
    if (this.datosDePago.value.invalid) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Por favor, complete todos los campos'});
      this.datosDePago.markAllAsTouched();
      return;
    }
    if(Math.random() > 0.5) {
      this.messageService.add({severity:'success', summary: 'Pago exitoso', detail: 'Pago realizado con éxito'});
      activateCallback(2)
      return;

    }else{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al realizar el pago'});
      return;
    }
    
  }

  verificarDatosEnvio(activateCallback: any) {

  }

  get formControls(){
    return this.datosDePago.controls;
  }

  inicializarFormularioPago() {
    this.datosDePago = this.fb.group({
      numeroTarjeta: ['' , [Validators.required, Validators.minLength(16), Validators.maxLength(19),Validators.pattern('^([0-9]{4} - ){3}[0-9]{4}$') ]],
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z\u00E0-\u00FC ]*$')]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['' , [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  formatearFechaExpiracion(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 4) input = input.substring(0, 4);

    if (input.length >= 2) {
      input = input.substring(0, 2) + ' / ' + input.substring(2);
    }

    this.datosDePago.patchValue({ fechaExpiracion: input }, { emitEvent: false });
  }

  formatearNumeroTarjeta(event: any) {
    let input = event.target.value.replace(/\D/g, ''); 
    if (input.length > 16) input = input.substring(0, 16);

    let formatted = input.replace(/(\d{4})/g, '$1 - ').trim();
    formatted = formatted.substring(0, formatted.length - 2); 

    this.datosDePago.patchValue({ numeroTarjeta: formatted }, { emitEvent: false });
  }
}
