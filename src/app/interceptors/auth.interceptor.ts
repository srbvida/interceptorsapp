import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);  // Inyectamos el servicio AuthService
  const token = authService.getToken();    // Obtenemos el token desde el servicio

  // Si el token existe, agregamos el Authorization header
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Pasamos la solicitud clonada al siguiente manejador
    return next(clonedRequest);
  }

  // Si no hay token, simplemente pasamos la solicitud original
  return next(req);
};
