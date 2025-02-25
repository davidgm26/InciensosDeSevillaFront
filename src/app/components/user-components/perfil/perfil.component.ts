import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [NavbarComponent,NgFor,NgIf],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}
