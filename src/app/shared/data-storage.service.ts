import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipebook-5e4f2.firebaseio.com/recipes.json', recipes).subscribe(resultData => {
      console.log(resultData);
    });
  }

  fetchRecipes() {
      this.http.get<Recipe>('https://recipebook-5e4f2.firebaseio.com/recipes.json').subscribe(recipe => {
        console.log(recipe);
     });
  }

}
