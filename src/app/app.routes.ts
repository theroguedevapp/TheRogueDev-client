import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [{
    path: "login",
    component: LoginComponent,
    canActivate: [authGuard]
},
{
    path: "",
    component: HomeComponent
},
{
    path: "register",
    component: RegisterComponent,
    canActivate: [authGuard]
}
];
