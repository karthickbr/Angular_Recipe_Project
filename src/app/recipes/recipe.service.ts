import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
     recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
     'This is simply a test',
     'https://www.spendwithpennies.com/wp-content/uploads/2013/10/Crispy-Oven-Fries-SpendWithPennies-27-500x375.jpg', [
       new Ingredient('Meat', 1),
       new Ingredient('French Fries', 20)
     ]),

    new Recipe('Another Test Recipe',
    'This is simply a test',
    'https://i.ytimg.com/vi/vXBzaDQTzgs/maxresdefault.jpg', [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 1)
    ]),

    new Recipe('A Tasty Recipe',
     'This is simply a test',
     // tslint:disable-next-line: max-line-length
     'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/03/singpaore-chilli-crab.jpg?itok=R3EHsPNC', [
       new Ingredient('Meat', 1),
       new Ingredient('French Fries', 20)
     ]),

     new Recipe('A Tasty Recipe',
     'This is simply a test',
     // tslint:disable-next-line: max-line-length
     'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/epic-summer-salad.jpg', [
       new Ingredient('Meat', 1),
       new Ingredient('French Fries', 20)
     ]),
  ];
  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredianceToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredient(ingredient);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
   this.recipes.splice(index, 1);
   this.recipeChanged.next(this.recipes.slice());
  }


}
