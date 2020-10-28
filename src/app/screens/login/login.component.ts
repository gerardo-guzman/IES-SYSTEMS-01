import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  userFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  logInFormGroup = new FormGroup({
    usuario: this.userFormControl,
    contrasena: this.passwordFormControl
  });

  constructor(
    private authSrv: AuthService, 
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logIn(event: Event) {
    event.preventDefault();
    if (this.logInFormGroup.invalid) {
      return;
    }
    console.log({
      usuario: this.logInFormGroup.value.usuario,
      contrasena: this.logInFormGroup.value.contrasena
    });
    this.authSrv.logIn(
      this.logInFormGroup.value.usuario,
      this.logInFormGroup.value.contrasena
    ).subscribe(({resultado}: any) => {
      if (resultado) {
        if (resultado.id_rol === 5) {
          this.authSrv.saveSession(resultado);
          this.router.navigate(['/app']);
        } else {
          this.snackBar.open(
            'Lo sentimos, el usuario que has ingresado no tiene permisos para acceder.',
            'Aceptar.',
            {
              duration: 2500,
              panelClass: ['matsnackbar-warn']
            }
          );
        }
        //this.authSrv.saveSession(resultado);
      } else {
        this.snackBar.open(
          'Usuario o contraseña incorrectos.',
          'Aceptar.',
          {
            duration: 2500,
            panelClass: ['matsnackbar-warn']
          }
        );
      }
    }, (err) => {
      console.log(err)
    });
  }

}
