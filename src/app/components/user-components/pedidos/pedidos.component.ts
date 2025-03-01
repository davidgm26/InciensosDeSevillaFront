import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PedidoItemComponent } from './pedido-item/pedido-item.component';
import { PedidosUserResponse } from '../../../shared/models/pedidos-user-response';
import { PedidoService } from '../../../shared/services/pedido.service';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  imports: [
    NavbarComponent,
    CommonModule,
    RouterModule,
    PedidoItemComponent,
    SpinnerComponent
],
  standalone: true,

})
export class PedidosComponent implements OnInit {

  pedidos: PedidosUserResponse[] = [];

  constructor(
    private pedidoService: PedidoService
  ) {

  }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidoService.getAllPedidosDeUsuario().subscribe({
      next: (resp) => {
        this.pedidos = resp;
      },
      error: (error) => {
        console.error('Error loading pedidos:', error);
      }
    });
  }
}
