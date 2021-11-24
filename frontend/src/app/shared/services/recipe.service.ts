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
  getFav(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/auth/favorites/`);
  }

  //recuperamos las puntuaciones de las recetas
  getRatings(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/auth/ratings/${id}`);
  }

  //recuperamos las recetas mas puntuadas
  getMoreRated(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/auth/more-rated/`);
  }

  getRecipesByCategory(id: number):Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/auth/recipes-category/${id}`);
  }

  getMyRecipes():Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/auth/my-recipes/`);
  }

  newRecipe(recipe: any):Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/auth/new-recipe/`, recipe);
  }
}