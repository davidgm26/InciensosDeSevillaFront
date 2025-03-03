import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verificar si hay token
    if (!this.authService.getToken()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No tienes permisos para acceder a esta página',
        sticky: true
      });
      this.router.navigate(['/login']);
      return false;
    }
    
    // Verificar rol para rutas de admin
    if (state.url.includes('/admin')) {
      // Obtener el rol del usuario del token
      const rol = sessionStorage.getItem('rol');
      
      if (rol !== 'ROLE_ADMIN') {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No tienes permisos de administrador',
          sticky: true
        });
        this.router.navigate(['/home']);
        return false;
      }
    }
    
    // Si llegamos aquí, permitir el acceso
    return true;
  }
}
