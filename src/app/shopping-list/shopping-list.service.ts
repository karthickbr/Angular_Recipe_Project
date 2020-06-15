import { Injectable, EventEmitter } from '@angular/core';
import {Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingrediantChanged = new Subject<Ingredient[]>();
  staredEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }

  getIngredient() {
   return this.ingredients.slice();
  }

  getIngredients(index: number) {
    return this.ingredients[index];
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingrediantChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingrediantChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingrediantChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.slice(index, 1);
    this.ingrediantChanged.next(this.ingredients.slice());
  }

}
