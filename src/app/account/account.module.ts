import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';


@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AccountRoutingModule,
        FormsModule,
        RegisterModule,
        LoginModule
    ]
})
export class AccountModule { }
