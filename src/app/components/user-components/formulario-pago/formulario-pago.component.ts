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
import { CrearLineaDto } from '../../../shared/models/crear-linea-dto.interface';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { FilaResumenComponent } from '../filaResumen/filaResumen.component';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-formulario-pago',
  imports: [ButtonModule, StepperModule, NavbarComponent, ReactiveFormsModule, TarjetaComponent, InputGroupModule,
    InputGroupAddonModule, InputTextModule, FormsModule, MessageModule, ToastModule, NgIf, CommonModule, FilaResumenComponent, SpinnerComponent],
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
  usuario: any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private carritoService: CarritoService,
    private router: Router,
    public loadingService: LoadingService
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
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, completa todos los campos requeridos correctamente' });
      Object.keys(this.datosDePago.controls).forEach(key => {
        const control = this.datosDePago.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
      activateCallback(2);
      this.currentStep = 2;
    }, 500);
  }

  get formControls() {
    return this.datosDePago.controls;
  }

  inicializarFormularioPago() {
    this.datosDePago = this.fb.group({
      numeroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{4} - \d{4} - \d{4} - \d{4}$/)]],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      fechaExpiracion: ['', [Validators.required, this.validarFechaExpiracion()]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  formatearNumeroTarjeta(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 0) {
      valor = valor.match(new RegExp('.{1,4}', 'g')).join(' - ');
    }
    this.datosDePago.get('numeroTarjeta')?.setValue(valor);
  }

  formatearFechaExpiracion(event: any) {
    let valor = event.target.value.replace(/[^\d\/]/g, '');
    if (valor.length > 0) {
      if (valor.length <= 2) {
        // Solo tenemos el mes
      } else if (valor.length === 3 && !valor.includes('/')) {
        // Tenemos 3 dígitos sin separador, añadimos el separador
        valor = valor.substring(0, 2) + ' / ' + valor.substring(2);
      } else if (valor.length > 3) {
        // Formateamos correctamente
        valor = valor.replace('/', '').replace(' ', '');
        valor = valor.substring(0, 2) + ' / ' + valor.substring(2, 4);
      }
    }
    this.datosDePago.get('fechaExpiracion')?.setValue(valor);
  }

  validarFechaExpiracion(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      if (!valor) {
        return { 'required': true };
      }

      // Verificar formato MM / YY
      if (!/^\d{2} \/ \d{2}$/.test(valor)) {
        return { 'formatoInvalido': true };
      }

      // Extraer mes y año
      const [mes, anio] = valor.split(' / ').map(Number);

      // Validar mes (1-12)
      if (mes < 1 || mes > 12) {
        return { 'mesInvalido': true };
      }

      // Validar que la fecha no esté expirada
      const fechaActual = new Date();
      const anioActual = fechaActual.getFullYear() % 100; // Obtener últimos dos dígitos del año
      const mesActual = fechaActual.getMonth() + 1; // getMonth() devuelve 0-11

      if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
        return { 'fechaExpirada': true };
      }

      return null;
    };
  }

  get formControlsEnvio() {
    return this.datosDeEnvio.controls;
  }

  inicializarFormularioEnvio() {
    this.datosDeEnvio = this.fb.group({
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      provincia: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      instrucciones: ['']
    });
  }

  getTotalCarrito() {
    return this.carrito.reduce((total, linea) => total + (linea.precioUnitario * linea.cantidad), 0);
  }

  getTotalFinal(): number {
    const subtotal = this.getTotalCarrito();
    return this.carrito.length < 3 ? subtotal + 4.99 : subtotal;
  }

  montarDireccion() {
    return this.datosDeEnvio.value.direccion + ', ' + this.datosDeEnvio.value.ciudad + ', provincia de ' + this.datosDeEnvio.value.provincia + ', ' + this.datosDeEnvio.value.codigoPostal;
  }

  verificarDatosEnvio(activateCallback: any) {
    if (this.datosDeEnvio.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, completa todos los campos requeridos correctamente' });
      Object.keys(this.datosDeEnvio.controls).forEach(key => {
        const control = this.datosDeEnvio.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
      activateCallback(3);
      this.currentStep = 3;
    }, 500);
  }


  confirmarPedido() {
    this.loadingService.show();
    setTimeout(() => {
      this.carritoService.tramitarPedido(this.montarDireccion()).subscribe(
        resp => {
          this.messageService.add({ severity: 'success', summary: 'Pedido Confirmado', detail: 'Tu pedido ha sido procesado correctamente' });
          this.carritoService.borrarCarrito();
          this.loadingService.hide();
          this.router.navigate(['/home']);
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido realizar el pedido'});
        }
      )

    }, 2000);
  }
}