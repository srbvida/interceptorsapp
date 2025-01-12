import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {DetailsComponent} from './pages/details/details.component';
import {ProductComponent} from './pages/product/product.component';
import {authInterceptor} from './interceptors/auth.interceptor';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path:'details/:id', component: DetailsComponent},
  { path:'update/:id', component: ProductComponent, canActivate: [authGuard]},
  { path:'new/:id', component: ProductComponent, canActivate: [authGuard]},
  { path: '**', component: NotFoundComponent }

];
