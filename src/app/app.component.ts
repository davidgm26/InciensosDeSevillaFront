import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './shared/footer/footer.component';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, FooterComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  providers: [
    { provide: HTTP_INTERCEPTORS, useFactory: () => loadingInterceptor, multi: true }
  ]
})
export class AppComponent implements OnInit {
  title = 'inciensosDeSevillaFront';
  mostrarFooter = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Suscribirse a los eventos de navegación para detectar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Verificar si la ruta actual es una ruta de administrador
      this.mostrarFooter = !event.url.includes('/admin');
    });
  }
}
