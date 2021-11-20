import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  // Registro
  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', user);
  }

  // recuperamos la informacion del perfil de usuario
  profileUser(): Observable<any> {

    return this.http.get('http://127.0.0.1:8000/api/auth/user-profile');
  }

  // recuperamos la informacion del perfil de usuario
  updateProfileUser(user: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/update-user-profile', user);
  }

  // recuperamos la imagen avatar del usuario
  getAvatar(id: number): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/getAvatar/'+ id);
  }
}

