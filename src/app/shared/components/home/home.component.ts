import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { TarjetaHomeComponent } from '../tarjeta-home/tarjeta-home.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,TarjetaHomeComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {

}
