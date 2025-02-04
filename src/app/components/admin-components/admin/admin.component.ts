import { Component, OnInit } from '@angular/core';
import { AsideNavbarComponent } from '../aside-navbar/aside-navbar.component';
import { DrawerModule } from 'primeng/drawer';
import { Button } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports:[AsideNavbarComponent,DrawerModule,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  visible: boolean = false;

  ngOnInit() {
  }

}
