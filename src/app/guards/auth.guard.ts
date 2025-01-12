import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el router

  const isAuthenticated = authService.isAuthenticated(); // Verifica si el usuario está autenticado
  if (!isAuthenticated) {
    router.navigate(['/login']); // Redirige al login si no está autenticado
    return false; // No permite el acceso
  }

  return true; // Permite el acceso
};
