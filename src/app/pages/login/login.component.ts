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
  async onSubmit(){
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Datos del formulario:', { username, password });

      // // Encriptar la contraseña
      // const saltRounds = 10; // Número de rondas de encriptación
      // const hashedPassword = await bcrypt.hash(password, saltRounds);
      //
      // console.log('Datos del formulario con password encriptada:', { username, hashedPassword });
      //Llamar al servicio para autenticar al usuario y esperar a que se complete
      await this.authService.login(username, password);

      // Verificamos si el usuario está autenticado
      if (this.authService.isAuthenticated()){
        console.log('Usuario autenticado, redirigiendo...');
        this.router.navigate(['/home']);  // Redirigimos a la página de home
      }else{
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    } else {
      console.log('Formulario inválido');
    }
  }

}

