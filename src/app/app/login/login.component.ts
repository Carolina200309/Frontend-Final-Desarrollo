import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {jwtDecode, JwtPayload} from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public usuario: string = "";
  public password: string = "";  // Cambio aquí
  public apiResponse: any = "";

  constructor(private http: HttpClient, private router: Router) {}

  public validateUserCredentials() {
    var url = "http://localhost:9898/api/login";
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    var body = {
      usuario: this.usuario,
      password: this.password  // Cambio aquí
    };

    this.http.post(url, body, { headers }).subscribe({
      next: resp => {
        this.apiResponse = resp;
        var token = this.apiResponse.token;
        sessionStorage.setItem('session_token', token);

        const decoded: JwtPayload = jwtDecode(token);
        const userId = decoded.sub;
        if (!userId) {
          console.error('No se encontró el ID de usuario en el token');
          return;
        }
        sessionStorage.setItem('userId', userId);

        this.router.navigate(['home']);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
