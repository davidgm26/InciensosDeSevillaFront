import { Component, effect, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TarjetaComponent } from "../tarjeta/tarjeta.component";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CommonModule, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CarritoService } from '../../../shared/services/carrito.service';
import { CrearLineaDto } from '../../../shared/models/crear-linea-dto';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { FilaResumenComponent } from '../filaResumen/filaResumen.component';
@Component({
  selector: 'app-formulario-pago',
  imports: [ButtonModule, StepperModule, NavbarComponent, ReactiveFormsModule, TarjetaComponent, InputGroupModule,
    InputGroupAddonModule, InputTextModule, FormsModule, MessageModule, ToastModule, NgIf, CommonModule, FilaResumenComponent,SpinnerComponent],
  templateUrl: './formulario-pago.component.html',
  styleUrl: './formulario-pago.component.css',
  standalone: true,
  providers: [MessageService]
})
export class FormularioPagoComponent implements OnInit {
  datosDePago!: FormGroup;
  datosDeEnvio!: FormGroup;
  currentStep: number = 1;
  carrito: CrearLineaDto[] = [];
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private carritoService: CarritoService,
    private router: Router
  ) {
    effect(() => {
      this.carrito = this.carritoService.getCarrito();
    })
  }

  ngOnInit(
  ) {
    this.inicializarFormularioPago();
    this.inicializarFormularioEnvio();
  }

  verificarDatosPago(activateCallback: any) {
    if (this.datosDePago.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Por favor, complete todos los campos correctamente' });
      this.datosDePago.markAllAsTouched();
      return;
    }
    if (Math.random() > 0.5) {
      this.messageService.add({ severity: 'success', summary: 'Pago exitoso', detail: 'Pago realizado con éxito' });
      activateCallback(2)
      this.currentStep = 2;
      return;

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al realizar el pago' });
      return;
    }

  }

  get formControls() {
    return this.datosDePago.controls;
  }

  inicializarFormularioPago() {
    this.datosDePago = this.fb.group({
      numeroTarjeta: ['', [
        Validators.required,
        Validators.pattern(/^\d{4} - \d{4} - \d{4} - \d{4}$/)
      ]],
      nombre: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z\u00E0-\u00FC ]*$')
      ]],
      fechaExpiracion: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        this.fechaExpiracionValidator()
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{3}$')
      ]]
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

    if (input.length > 16) {
      input = input.substring(0, 16);
    }

    let formatted = '';
    for (let i = 0; i < input.length; i += 4) {
      if (i > 0) formatted += ' - ';
      formatted += input.slice(i, i + 4);
    }
    this.datosDePago.patchValue({ numeroTarjeta: formatted }, { emitEvent: false });
  }

  fechaExpiracionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const matches = value.match(/^(0[1-9]|1[0-2]) \/ ([0-9]{2})$/);
      if (!matches) return { formatoInvalido: true };

      const month = parseInt(matches[1], 10);
      const year = parseInt('20' + matches[2], 10);
      const today = new Date();
      const expirationDate = new Date(year, month - 1);

      if (expirationDate < today) {
        return { fechaExpirada: true };
      }

      return null;
    };
  }

  /*
    FORMULARIO DE DIRECCION POSTAL
  */



  get formControlsEnvio() {
    return this.datosDeEnvio.controls;
  }

  inicializarFormularioEnvio() {
    this.datosDeEnvio = this.fb.group({
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      codigoPostal: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{5}$')
      ]],
      provincia: ['', Validators.required],
      telefono: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{9}$')
      ]],
      instrucciones: ['']
    });
  }

  montarDireccion() {
    return this.datosDeEnvio.value.direccion + ', ' + this.datosDeEnvio.value.ciudad + ', provincia de' + this.datosDeEnvio.value.provincia + ', ' + this.datosDeEnvio.value.codigoPostal;
  }

  verificarDatosEnvio(activateCallback: any) {
    if (this.datosDeEnvio.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos correctamente'
      });
      this.datosDeEnvio.markAllAsTouched();
      return;
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Dirección guardada correctamente'
    });
    console.log(this.montarDireccion());

    activateCallback(3);
    this.currentStep = 3;
  }

  /*
    RESUMEN DEL PEDIDO
  */

  getTotalCarrito() {
    return this.carritoService.calcularCarrito();
  }

  confirmarPedido() {
    this.carritoService.tramitarPedido(this.montarDireccion()).subscribe(
      (resp) => {
        this.messageService.add({ severity: 'success', summary: 'Pedido Tramitado', detail: 'Compra realizada' });
        this.carritoService.borrarCarrito();
        this.router.navigate(['/home']);

      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error al tramitar Pedido', detail: 'No se pudo tramitar el pedido' });
        console.log(err);
      }
    )
  }
}