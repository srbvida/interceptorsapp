import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {DetailsComponent} from './pages/details/details.component';
import {ProductComponent} from './pages/product/product.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path:'details/:id', component: DetailsComponent},
  { path:'update/:id', component: ProductComponent},
  { path:'new/:id', component: ProductComponent},
  { path: '**', component: NotFoundComponent }

];
