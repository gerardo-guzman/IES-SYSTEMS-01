import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { LoginComponent } from 'src/app/screens/login/login.component';
import { SideNavBarComponent } from 'src/app/components/side-nav-bar/side-nav-bar.component';
import { DashboardComponent } from 'src/app/screens/dashboard/dashboard.component';
import { ComponentOneComponent } from 'src/app/screens/component-one/component-one.component';

// Guard
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
  {
    path: 'app', component: SideNavBarComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'component-01', component: ComponentOneComponent }
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
