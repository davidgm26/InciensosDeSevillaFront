import { Component, Input, OnInit } from '@angular/core';
import { Resenia } from '../../models/resenia';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comentario',
  imports: [Rating,FormsModule,CommonModule],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent implements OnInit{

  @Input() comentario!: Resenia;
  valoracion!: number;

  constructor() { }

  ngOnInit(): void {
    this.valoracion = this.comentario.valoracion;
  }

}
