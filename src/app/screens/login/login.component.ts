import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators, } from '@angular/forms';

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

  constructor(private authSrv: AuthService) { }

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
        this.authSrv.saveSession(resultado);
      } else {
        console.log('resultado nulo');
      }
    }, (err) => {
      console.log(err)
    });
  }

}
