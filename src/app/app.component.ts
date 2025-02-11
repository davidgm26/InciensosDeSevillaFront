import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  providers: [MessageService]
})
export class AppComponent {
  title = 'inciensosDeSevillaFront';
}
