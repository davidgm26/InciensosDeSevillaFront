import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { PerfilUsuarioResponse } from '../../../shared/models/PerfilUsuarioResponse';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-perfil',
  imports: [NavbarComponent, SpinnerComponent, NgFor, NgIf],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  standalone: true
})
export class PerfilComponent implements OnInit {
  perfilUsuario!: PerfilUsuarioResponse;

  constructor(
    private authService: AuthService,
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.cargarInfo();
  }

  cargarInfo() {
    this.authService.getUserProfileInfo().subscribe(
      resp => {
        this.perfilUsuario = resp;
        this.loadingService.hide();
      },
      error => {
        this.loadingService.hide();
      }
    );
  }
}
