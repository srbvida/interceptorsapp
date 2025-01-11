import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken'); //obtenemos el token del localStorage

  // Si el token existe, agregamos el Authorization header
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token || ''}`,
      },
    });
    // Pasamos la solicitud clonada al siguiente manejador
    return next(clonedRequest);
  }

  // Si no hay token, simplemente pasamos la solicitud original
  return next(req);
};

/*
// Almacenar el token en Local Storage
      localStorage.setItem('authToken', this.token);
      console.log('Token almacenado en Local Storage:', this.token);
 */
