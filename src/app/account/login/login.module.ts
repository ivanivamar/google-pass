import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        CommonModule,
        LoginRoutingModule,
        FormsModule
    ]
})
export class LoginModule { }
