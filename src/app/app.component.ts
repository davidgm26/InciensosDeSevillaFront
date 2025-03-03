import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  providers: [
    { provide: HTTP_INTERCEPTORS, useFactory: () => loadingInterceptor, multi: true }
  ]
})
export class AppComponent {
  title = 'inciensosDeSevillaFront';
}
