import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  navOptions = [
    { name: 'Dashboard', route: 'dashboard' },
    { name: 'Componente 1', route: 'component-01' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

  logOut() {
    console.log('sali');
  }

}
