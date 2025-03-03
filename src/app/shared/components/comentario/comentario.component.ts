import { Component, Input, OnInit } from '@angular/core';
import { Resenia } from '../../models/resenia.interface';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-comentario',
  standalone:true,
  imports: [Rating, FormsModule, CommonModule,TimeAgoPipe],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent implements OnInit {

  @Input() comentario!: Resenia;
  valoracion!: number;

  constructor() { }

  ngOnInit(): void {
    this.valoracion = this.comentario.valoracion;
  }

  /*editarComentario(){
   }
  */
}
