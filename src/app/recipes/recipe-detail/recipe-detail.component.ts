import { Component, OnInit, HostListener, ElementRef} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";

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
              private slService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
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
    this.slService.addIngredients(this.Recipe.ingredients)
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
