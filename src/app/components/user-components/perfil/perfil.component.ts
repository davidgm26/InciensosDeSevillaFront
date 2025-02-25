import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { PerfilUsuarioResponse } from '../../../shared/models/PerfilUsuarioResponse';

@Component({
  selector: 'app-perfil',
  imports: [NavbarComponent,NgFor,NgIf],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  perfilUsuario!: PerfilUsuarioResponse;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
      this.cargarInfo();
  }

  cargarInfo(){
    this.authService.getUserProfileInfo().subscribe(
      resp => {
        this.perfilUsuario = resp;
        console.log(this.perfilUsuario);
      }
    );
  }

}
