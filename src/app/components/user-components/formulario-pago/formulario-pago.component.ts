import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-pago',
  imports: [ButtonModule, StepperModule, NavbarComponent,ReactiveFormsModule],
  templateUrl: './formulario-pago.component.html',
  styleUrl: './formulario-pago.component.css',
  standalone: true,
  providers: []
})
export class FormularioPagoComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

  }

  verificarDatosPago(activateCallback: any){
    console.log("Verificar datos de pago");
    activateCallback(2)
    return ;
  }
}
