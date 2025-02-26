import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-spinner',
  imports: [NgIf, CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  standalone: true
})
export class SpinnerComponent {
  constructor(
    public loadingService: LoadingService
  ) { }
}
