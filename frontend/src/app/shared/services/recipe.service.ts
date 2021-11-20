import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  constructor(private http: HttpClient) { }

  // recuperamos la imagen avatar del usuario
  getLatestRecipes(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/latest/');
  }

  //recueperamos la receta por id
  getRecipeById(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/auth/recipe/${id}`);
  }

  //recuperamos las recetas favoritas del usuario
  getFav(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/auth/favorites/${id}`);
  }
}