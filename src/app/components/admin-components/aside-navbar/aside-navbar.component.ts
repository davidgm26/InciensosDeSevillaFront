import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../../../shared/services/loading.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-aside-navbar',
  templateUrl: './aside-navbar.component.html',
  styleUrls: ['./aside-navbar.component.css'],
  standalone: true,
  imports: [DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass,RouterLink],
  encapsulation: ViewEncapsulation.None
})
export class AsideNavbarComponent implements OnInit {

  visible: boolean = false;
  login: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getToken() == null ? this.login = false : this.login = true;
  }

  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e:any): void {
      this.drawerRef.close(e);
  }

  cerrarSesion(){
    sessionStorage.removeItem('token');
    this.login = false;
    this.loadingService.show();
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }

}
