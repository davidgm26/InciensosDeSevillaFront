import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export const compraGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const compra = sessionStorage.getItem('compra');

  if (compra === 'true') {
    return true;
  }
  router.navigate(['/catalogo/categoria/1']);
  return false;
};