import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);

  private api = 'http://localhost:3000/auth';

  login(data:any): Observable<any>{
    return this.http.post<any>(`${this.api}/login`, data)
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        })
      );
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
  


  getToken(){
    return localStorage.getItem('token');
  }


  estaLogueado(){
    return !!this.getToken();
  }

    getUsuario() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  getRol() {
    return this.getUsuario()?.rol;
  }

  esAdmin() {
    return this.getRol() === 'ADMIN';
  }

  
} 
