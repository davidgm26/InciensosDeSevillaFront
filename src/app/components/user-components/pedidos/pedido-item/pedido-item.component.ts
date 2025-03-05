import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PedidosUserResponse } from '../../../../shared/models/pedidos-user-response';

@Component({
  selector: 'app-pedido-item',
  templateUrl: './pedido-item.component.html',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1'
      })),
      transition('collapsed <=> expanded', [
        animate('200ms ease-out')
      ])
    ])
  ]
})
export class PedidoItemComponent {
  @Input() pedido!: PedidosUserResponse;
  expanded = false;
  
  // Imagen por defecto para productos sin imagen
  private readonly imagenPorDefecto = 'defecto.jpg';

  togglePedido() {
    this.expanded = !this.expanded;
  }

  getEstadoClase(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'enviado':
        return 'bg-green-100 text-green-800';
      case 'en proceso':
        return 'bg-blue-100 text-blue-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  
  /**
   * Obtiene la URL de la imagen del producto o devuelve una imagen por defecto si no existe
   * @param imagenUrl URL de la imagen del producto
   * @returns URL válida de imagen
   */
  obtenerImagenProducto(imagenUrl: string): string {
    if (!imagenUrl || imagenUrl.trim() === '') {
      return this.imagenPorDefecto;
    }
    return imagenUrl;
  }
  
  /**
   * Maneja el error de carga de imagen y muestra la imagen por defecto
   * @param event Evento de error
   */
  cargarDefault(event: any): void {
    event.target.src = this.imagenPorDefecto;
  }
}
