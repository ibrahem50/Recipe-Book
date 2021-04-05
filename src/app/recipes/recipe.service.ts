import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingrediant.model';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitezl',
      'A super-tasty Schniztel - just awesome! ',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Burger',
      'this is greet!!',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Bread', 1), new Ingredient('Meat', 20)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
