import { Component, OnInit, OnDestroy} from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  // recipes: Recipe[] = [
  //   new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
  //   new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  // ];

  recipes: Recipe[];
  private recipeChangeSub: Subscription;

  constructor(private recipeServie: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
   this.recipeChangeSub =  this.recipeServie.recipeChanged.subscribe((recipe: Recipe[]) => {
      this.recipes = recipe;
    });

    this.recipes = this.recipeServie.getRecipes();

  }

  onNewRecipe() {
      this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
   this.recipeChangeSub.unsubscribe();

  }

  }
