import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';  // Servicio de autorizacion
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = ''; // Variable para el mensaje de error

  constructor(private authService: AuthService, private router: Router, formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  onSubmit(){
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Datos del formulario:', { username, password });
      //Llamar al servicio para autenticar al usuario
      this.authService.login(username, password);
      if (this.authService.isAuthenticated()){
        this.router.navigate(['/home']);  // Redirigimos a la página de home
      }else{
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    } else {
      console.log('Formulario inválido');
    }
  }

}

