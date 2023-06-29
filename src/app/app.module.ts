import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { provideAuth, getAuth, AuthModule } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { HomeComponent } from './home/home.component';
import { GeneratorComponent } from './generator/generator.component';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { MInputComponent } from './shared/common/m-input/m-input.component';
import { TabsComponent } from './shared/common/tabs/tabs.component';
import { PasswordsComponent } from './home/passwords/passwords.component';
import { PasswordModalComponent } from './home/passwords/password-modal/password-modal.component';
import { NotesComponent } from './home/notes/notes.component';
import { NoteModalComponent } from './home/notes/note-modal/note.modal.component';
import { SearchComponent } from './home/search/search.component';
import { ProfileModalComponent } from './home/profile-modal/profile-modal.component';
import { RippleDirective } from './ripple.directive';
import { MSliderComponent } from './shared/common/m-slider/m-slider.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MDropdownComponent } from './shared/common/m-dropdown/m-dropdown.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        GeneratorComponent,
        LoginComponent,
        RegisterComponent,
        MInputComponent,
        TabsComponent,
        PasswordsComponent,
        PasswordModalComponent,
        NotesComponent,
        NoteModalComponent,
        SearchComponent,
        ProfileModalComponent,
        RippleDirective,
        MSliderComponent,
        MDropdownComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AccountModule,
        CommonModule,
        AuthModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        provideAuth(() => getAuth()),
        DragDropModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
