import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserUpdateComponent } from './components/users/user-update.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
    {path:"sign-up", component:LoginComponent},
    {path:"sign-in", component:RegisterComponent},
    {path:"users-crud", component:UserUpdateComponent},
    {path:"products-crud", component:ProductsComponent}
];
