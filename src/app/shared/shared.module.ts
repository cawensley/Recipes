import {NgModule} from "@angular/core";
import {AlertComponent} from "./alert.component";
import {LoadingSpinnerComponent} from "./loading-spinner.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    CommonModule
  ]
})
export class SharedModule {}
