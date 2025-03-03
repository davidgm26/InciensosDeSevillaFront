import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-spinner',
  imports: [NgIf, CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  standalone: true
})
export class SpinnerComponent implements OnInit{
  constructor(
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.loading$.subscribe(isLoading => {
      console.log('Spinner loading state changed:', isLoading);
    });
  }
}

