import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  template: `
    <app-menu></app-menu>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class HomeLayoutComponent {
    constructor(private router: Router){
        if(document.location.pathname == "/"){
            this.router.navigate(['/tasks']);
        }
    }
}