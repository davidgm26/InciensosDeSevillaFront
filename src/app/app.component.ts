import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { SpinnerComponent } from "./shared/components/spinner/spinner.component";
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  providers: [MessageService,
    { provide: HTTP_INTERCEPTORS, useFactory: () => loadingInterceptor, multi: true }

  ]
})
export class AppComponent {
  title = 'inciensosDeSevillaFront';
}
