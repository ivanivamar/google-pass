import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegisterComponent } from './account/register/register.component';
import { HomeComponent } from './home/home.component';
import { GeneratorComponent } from './generator/generator.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        ...canActivate(() => redirectUnauthorizedTo(['login'])),
    },
    {
        path: 'generator',
        component: GeneratorComponent,
        pathMatch: 'full',
        ...canActivate(() => redirectUnauthorizedTo(['login'])),
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
