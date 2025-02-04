import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tabla-dinamica',
  imports: [TableModule, NgFor,NgIf],
  templateUrl: './tabla-dinamica.component.html',
  styleUrl: './tabla-dinamica.component.css'
})
export class TablaDinamicaComponent implements OnInit, OnChanges {

  @Input() data: any[] = [];
  @Input() dataReady: boolean = false;
  cols!: string[];

  constructor() { }

  ngOnInit(): void {
    this.initializeColumns();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.dataReady) {
      this.initializeColumns();
    }
  }

  initializeColumns(): void {
    if (this.data && this.data.length > 0) {
      debugger;
      this.cols = Object.keys(this.data[0]) //.map(key => key.charAt(0).toUpperCase() + key.slice(1));
      console.log(this.cols);
      
    } else {
      this.cols = [];
    }
  }
}
