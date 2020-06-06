import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private shoppingListService: ShoppingListService) { }

  recipeSelected = new EventEmitter<Recipe>();

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
    ])
  ];


  getRecipes() {
    return this.recipes.slice();
  }

  addIngredianceToShoppingList(ingredient: Ingredient[]) {
      this.shoppingListService.addIngredient(ingredient);
  }
}
