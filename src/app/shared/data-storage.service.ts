import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map,tap} from 'rxjs/operators'
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://angularrecipebook-7ba65.firebaseio.com/recipes.json',recipes,{
      params: new HttpParams().set('auth',this.authService.getUserToken())
    })
      .subscribe(response=>{console.log(response)})
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://angularrecipebook-7ba65.firebaseio.com/recipes.json',{
      params: new HttpParams().set('auth',this.authService.getUserToken())
    })
      //if recipe has no ingredients, pipe function returns empty ingredients array//
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }),
        tap(recipes => {this.recipesService.setRecipes(recipes)})
      )
  }

}
