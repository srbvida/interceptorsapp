import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = '';

  httpClient = inject(HttpClient);
  private baseUrl :string = 'http://localhost:8080/api';


  // Método para simular el login y almacenar el token
  async login(username: string, password: string) {
    //this.token =  await lastValueFrom(this.httpClient.get<string>(`${this.baseUrl}/login`));
    try {
      // Solicitar el token desde el servidor
      const response = await lastValueFrom(
        this.httpClient.post<{token: string}>(`${this.baseUrl}/login`, { username, password })
      );

      this.token = response.token.replace('Bearer ', '');
      localStorage.setItem('authToken', this.token); // Actualizamos el token en el localStorage
      console.log('Token almacenado:', this.token);
    } catch (error) {
      console.error('Error al realizar el login:', error);
    }
  }
  logout() {
      this.token = '';
      localStorage.removeItem('authToken');
  }


  // Método para obtener el token almacenado
  getToken(): string {
    return this.token;
  }

  // Método para verificar si el token existe
  // isAuthenticated(): boolean {
  //   return this.token.length > 0;
  // }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Retorna true si hay un token
  }

}
