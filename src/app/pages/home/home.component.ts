import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {CardComponent} from '../../components/card/card.component';
import {RouterLink} from '@angular/router';
import {IProduct} from '../../interfaces/IProduct';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [
    CardComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  arrProducts : IProduct[];
  isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.arrProducts = [];
  }
  async ngOnInit() : Promise<void> {
    this.checkAuthentication();
    try{
      this.arrProducts = await this.productService.getAll();
    }catch(err) {
      console.log('Error al conectar a la API: '+err);
    }
  }

  onLogout(): void {
    this.authService.logout();
    console.log('Sesión cerrada desde el componente');
  }

  checkAuthentication(): void {
    // Comprueba si el token existe en Local Storage
    this.isAuthenticated = !!localStorage.getItem('authToken');
  }

  /*ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(
      data => {
        console.log('Datos recibidos:', data);
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }*/

}

