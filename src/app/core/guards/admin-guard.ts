import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/authService';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = async(route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const usuario = auth.obtenerUsuario();

  if (usuario && usuario.rol === 'admin') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
