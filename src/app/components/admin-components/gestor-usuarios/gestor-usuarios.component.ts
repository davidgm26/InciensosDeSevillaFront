import { Component, OnInit } from '@angular/core';
import { GestionTablaUsuariosComponent } from '../gestion-tabla-usuarios/gestion-tabla-usuarios.component';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-gestor-usuarios',
  templateUrl: './gestor-usuarios.component.html',
  styleUrls: ['./gestor-usuarios.component.css'],
  imports: [GestionTablaUsuariosComponent, SpinnerComponent],
  standalone: true
})
export class GestorUsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
