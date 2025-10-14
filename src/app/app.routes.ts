import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [{
    path: "login",
    component: LoginComponent,
},
{
    path: "",
    component: HomeComponent,
},
{
    path: "register",
    component: RegisterComponent,
},
{
    path: "user",
    component: UserProfileComponent,
}
];
