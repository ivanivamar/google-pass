import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
    itemList = [
        { name: 'Home', link: '/home', icon: 'home' },
        { name: 'Generator', link: '/generator', icon: 'password' },
        { name: 'Settings', link: '/others', icon: 'settings' },
    ];
}
