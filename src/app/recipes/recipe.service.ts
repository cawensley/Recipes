import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  private recipes: Recipe[]=[]
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel -- Just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG/1920px-Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]
  //     ),
  //   new Recipe(
  //     'Italian Chicken',
  //     'Fake Recipe from the interwebs',
  //     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/5/14/1/WU1902_Italian-Chicken-Sheet-Pan-Supper_s4x3.jpg.rend.hgtvcom.826.620.suffix/1526332485385.jpeg',
  //     [
  //       new Ingredient('Chicken', 2),
  //       new Ingredient('Parmesan', 1),
  //       new Ingredient('Tomato Sauce', 2)
  //     ]
  //   )
  // ];

  constructor() {}

  getRecipes () {
    return this.recipes.slice();
  }

  getRecipe (index: number) {
    return this.recipes[index]
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice())
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }
}
