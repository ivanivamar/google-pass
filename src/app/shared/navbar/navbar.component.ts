import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
    itemList = [
        { name: 'Home', link: '/', icon: 'home' },
        { name: 'generator', link: '/generator', icon: 'password' },
        { name: 'others', link: '/others', icon: 'settings' },
    ];
}
