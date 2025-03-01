import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ReseniaResponse } from '../../../../shared/models/resenia-response.interface';
import { ReseniaService } from '../../../../shared/services/resenia.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-resenia-item',
  templateUrl: './resenia-item.component.html',
  styleUrls: ['./resenia-item.component.css'],
  imports:[
    CommonModule, 
    FormsModule, 
    RatingModule, 
    DialogModule, 
    ButtonModule,
    ToastModule
  ],
  standalone: true
})
export class ReseniaItemComponent implements OnInit {

  @Input() resenia!: ReseniaResponse;
  @Output() reseniaEliminada = new EventEmitter<void>();
  visible: boolean = false;

  constructor(
    private reseniaService: ReseniaService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  showDialog(){
    this.visible = true;
  }

  eliminarResenia(id: number) {
    this.reseniaService.eliminarResenia(id).subscribe({
      next: (res) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Reseña eliminada'});
        this.reseniaEliminada.emit();
        this.visible = false;
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary:'Error', detail:err.error.message});
      }
    })
  }
}
