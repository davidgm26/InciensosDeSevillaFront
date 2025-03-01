import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  const router = inject(Router);

  if (!authService.getToken()) {
    messageService.add({
      severity: 'error',
      summary: 'Error',
      sticky: true,
      detail: 'No tienes permisos para acceder a esta página',
    });
    router.navigate(['/home']);
    return false;
  }
  return true;
};
