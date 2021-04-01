import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'this is simply a test',
      'https://www.wellplated.com/wp-content/uploads/2017/03/Crock-Pot-Mexican-Casserole-768x986.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
