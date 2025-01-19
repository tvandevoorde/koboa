import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = '/api/recipes';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
      return this.http.get(this.apiUrl);
  }

  getRecipeById(recipeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${recipeId}`);
  }

  createRecipe(recipe: any): Observable<any> {
      return this.http.post(this.apiUrl, recipe);
  }

  deleteRecipe(recipeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${recipeId}`);
  }

  updateRecipe(recipeId: number, recipe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${recipeId}`, recipe);
  }

}
