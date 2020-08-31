import {NgModule} from "@angular/core";
import {RecipeService} from "./recipes/recipe.service";

@NgModule({
  providers: [RecipeService]
})
export class CoreModule {}
