import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = '';

  // Método para simular el login y almacenar el token
  login(username: string, password: string) {
    if (username === 'user' && password === 'password') {
      console.log(username);
      console.log(password);
      this.token = 'fake-jwt-token';
    }
  }


  // Método para obtener el token almacenado
  getToken(): string {
    return this.token;
  }

  // Método para verificar si el token existe
  isAuthenticated(): boolean {
    return this.token.length > 0;
  }
}
