import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {StoreModule} from '@ngrx/store'

import { AppComponent } from './app.component';
import { MainheaderComponent } from './mainheader/mainheader.component';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {shoppingListReducer} from "./shopping-list/store/shopping-list.reducer";

@NgModule({
  declarations: [
    AppComponent,
    MainheaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
