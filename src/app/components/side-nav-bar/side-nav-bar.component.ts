import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log({
      mssg: 'Tiene acceso?',
      accces:this.authSrv.hasAccess()
    });
  }


  logOut() {
    this.authSrv.destroySession();
    this.router.navigate(['/login'])
  }

}
