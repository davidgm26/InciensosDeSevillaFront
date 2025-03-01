import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { LoadingService } from '../../../shared/services/loading.service';
import { AuthService } from '../../../shared/services/auth.service';
import { PerfilUsuarioResponse } from '../../../shared/models/PerfilUsuarioResponse.interface';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { PedidoService } from '../../../shared/services/pedido.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SpinnerComponent
  ]
})
export class PerfilComponent implements OnInit {
  perfilUsuario!: PerfilUsuarioResponse;
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    public loadingService: LoadingService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.cargarInfo();
  }

  cargarInfo() {
    Promise.resolve().then(() => {
      this.loadingService.show();
    });
    
    this.authService.getUserProfileInfo()
      .pipe(
        finalize(() => {
          Promise.resolve().then(() => {
            this.loadingService.hide();
          });
        })
      )
      .subscribe({
        next: (resp) => {
          this.perfilUsuario = resp;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading profile:', error);
        }
      });
  }
}
