import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = 'https://ies-webcontent.com.mx/xccm/user/validarUsuario';
  private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  private key = 'IESSYSTEMS';

  constructor(private httpClient: HttpClient) { }

  logIn(usuario: string, contrasena: string) {
    return this.httpClient.post(
      this.loginURL,
      { usuario, contrasena }, //body
      { headers: this.headers} //options
    );
  }

  saveSession(data: {exito:boolean, id_rol: number, desc_rol: string}) {
    const encrypted = this.encryptData(data.exito, data.id_rol, data.desc_rol);
    localStorage.setItem('SESSION', JSON.stringify(encrypted));
  }

  encryptData(exito:boolean, id_rol: number, desc_rol: string) {
    return {
      exito: CryptoJS.AES.encrypt(exito?'true':'false', this.key).toString(),
      id_rol: CryptoJS.AES.encrypt(id_rol.toString(), this.key).toString(),
      desc_rol: CryptoJS.AES.encrypt(desc_rol, this.key).toString()
    }
  }

  decryptData(data: {exito: string, id_rol: string, desc_rol: string}) {
    try {
      const exito = (CryptoJS.AES.decrypt(data.exito, this.key).toString(CryptoJS.enc.Utf8) === 'true')?true:false;
      const id_rol = parseInt(CryptoJS.AES.decrypt(data.id_rol, this.key).toString(CryptoJS.enc.Utf8));
      const desc_rol = CryptoJS.AES.decrypt(data.desc_rol, this.key).toString(CryptoJS.enc.Utf8);
      return {
        exito,
        id_rol,
        desc_rol
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  getSessionData() {
    const currentSession = JSON.parse(localStorage.getItem('SESSION'));
    if (!currentSession) {
      return false;
    }
    return this.decryptData(currentSession);
  }

  hasAccess(): boolean {
    const session = this.getSessionData();
    if (!session) {
      return false;
    }
    if (session.exito && session.id_rol === 3) {
      return true;
    } else {
      return false;
    }
  }

}
