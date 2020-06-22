import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
        this.id = +param['id'];
        this.editMode = param['id'] != null;
        // console.log(this.editMode);
        this.initForm();
    });
  }

  private initForm() {

        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        const recipeIngrediance =  new FormArray([]);

        if (this.editMode) {
          const recipe = this.recipeService.getRecipe(this.id);
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (const ingrediant of recipe.ingredients) {
              recipeIngrediance.push(
                new FormGroup({
                  'name': new FormControl(ingrediant.name, [Validators.required]),
                  'amount': new FormControl(ingrediant.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              );
            }
          }
        }

        this.recipeForm = new FormGroup({
          'name': new FormControl(recipeName, Validators.required),
          'imagePath': new FormControl(recipeImagePath, Validators.required),
          'description': new FormControl(recipeDescription, Validators.required),
          'ingredients': recipeIngrediance
        });
  }

  onSubmit() {
    // console.log(this.recipeForm);

    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
     // this.router.navigate(['recipes']);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      // this.router.navigate(['recipes']);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  OnAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
    );
  }

  onCancel() {
    // this.router.navigate(['recipes']);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onIngredientDelete(index: number) {

    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }


}
