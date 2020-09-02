import { Component, OnInit, HostListener, ElementRef} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as fromApp from "../../app.reducer";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  ShowManageisTrue = false;
  Recipe: Recipe;
  id: number;

  onToggleManageNavbar () {
    this.ShowManageisTrue = !this.ShowManageisTrue;
  }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.ShowManageisTrue = this.elRef.nativeElement.contains(event.target) ? this.ShowManageisTrue : false;
  }

  constructor(private elRef: ElementRef,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id']
        this.Recipe = this.recipeService.getRecipe(this.id)
      }
    )
  }

  onAddToShoppingList () {
    // this.slService.addIngredients(this.Recipe.ingredients)
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.Recipe.ingredients))
    alert("Ingredients added to shopping list!")
  }

  onEditRecipe () {
    this.router.navigate(['edit'],{relativeTo: this.route})
  }

  onDeleteRecipe () {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes']);
  }

}
