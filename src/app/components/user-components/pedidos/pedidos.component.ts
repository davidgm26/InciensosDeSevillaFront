import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { PedidoService } from '../../../shared/services/pedido.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { PedidoItemComponent } from './pedido-item/pedido-item.component';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

interface TimelineEvent {
  status: string;
  date: Date;
  description: string;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SpinnerComponent,
    PedidoItemComponent,
    TimelineModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    FormsModule
  ],
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];
  pedidosFiltrados: any[] = [];
  loading = true;
  filtroEstado: string = '';
  filtroFecha: Date | null = null;
  ordenSeleccionado: string = '';

  estadosFiltro = [
    { label: 'Todos', value: '' },
    { label: 'En Proceso', value: 'EN_PROCESO' },
    { label: 'Completado', value: 'COMPLETADO' },
    { label: 'Cancelado', value: 'CANCELADO' }
  ];

  opcionesOrden = [
    { label: 'Más recientes', value: 'RECIENTE' },
    { label: 'Más antiguos', value: 'ANTIGUO' },
    { label: 'Mayor importe', value: 'MAYOR_IMPORTE' },
    { label: 'Menor importe', value: 'MENOR_IMPORTE' }
  ];

  constructor(
    private pedidoService: PedidoService,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.loading = true;
    this.loadingService.show();
    this.pedidoService.getAllPedidosDeUsuario().subscribe({
      next: (response) => {
        this.pedidos = response;
        this.pedidosFiltrados = [...this.pedidos];
        this.aplicarFiltrosYOrden();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los pedidos'
        });
      },
      complete: () => {
        this.loading = false;
        this.loadingService.hide();
      }
    });
  }

  getPedidosPorEstado(estado: string): number {
    return this.pedidos.filter(p => p.estado === estado).length;
  }

  filtrarPedidos() {
    this.aplicarFiltrosYOrden();
  }

  ordenarPedidos() {
    this.aplicarFiltrosYOrden();
  }

  private aplicarFiltrosYOrden() {
    let pedidosFiltrados = [...this.pedidos];

    // Aplicar filtro por estado
    if (this.filtroEstado) {
      pedidosFiltrados = pedidosFiltrados.filter(p => p.estado === this.filtroEstado);
    }

    // Aplicar filtro por fecha
    if (this.filtroFecha) {
      const fechaFiltro = new Date(this.filtroFecha);
      pedidosFiltrados = pedidosFiltrados.filter(p => {
        const fechaPedido = new Date(p.fecha);
        return fechaPedido.toDateString() === fechaFiltro.toDateString();
      });
    }

    // Aplicar ordenamiento
    switch (this.ordenSeleccionado) {
      case 'RECIENTE':
        pedidosFiltrados.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        break;
      case 'ANTIGUO':
        pedidosFiltrados.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        break;
      case 'MAYOR_IMPORTE':
        pedidosFiltrados.sort((a, b) => b.total - a.total);
        break;
      case 'MENOR_IMPORTE':
        pedidosFiltrados.sort((a, b) => a.total - b.total);
        break;
    }

    this.pedidosFiltrados = pedidosFiltrados;
  }

  getTimelineEvents(pedido: any): TimelineEvent[] {
    const events: TimelineEvent[] = [];
    
    // Añadir evento de creación
    events.push({
      status: 'Pedido Realizado',
      date: new Date(pedido.fecha),
      description: 'Tu pedido ha sido recibido y confirmado'
    });

    // Añadir eventos según el estado
    switch (pedido.estado) {
      case 'EN_PROCESO':
        events.push({
          status: 'En Preparación',
          date: new Date(pedido.fecha_actualizacion || pedido.fecha),
          description: 'Tu pedido está siendo preparado'
        });
        break;
      case 'COMPLETADO':
        events.push({
          status: 'En Preparación',
          date: new Date(pedido.fecha_actualizacion || pedido.fecha),
          description: 'Tu pedido está siendo preparado'
        });
        events.push({
          status: 'Enviado',
          date: new Date(pedido.fecha_envio || pedido.fecha),
          description: 'Tu pedido ha sido enviado'
        });
        events.push({
          status: 'Entregado',
          date: new Date(pedido.fecha_entrega || pedido.fecha),
          description: 'Tu pedido ha sido entregado'
        });
        break;
      case 'CANCELADO':
        events.push({
          status: 'Cancelado',
          date: new Date(pedido.fecha_cancelacion || pedido.fecha),
          description: 'El pedido ha sido cancelado'
        });
        break;
    }

    return events;
  }
}
