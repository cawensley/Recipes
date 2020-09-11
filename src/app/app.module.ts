import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreRouterConnectingModule} from "@ngrx/router-store";

import { AppComponent } from './app.component';
import { MainheaderComponent } from './mainheader/mainheader.component';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import * as fromApp from './app.reducer';
import {AuthEffects} from "./auth/store/auth.effects";
import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent,
    MainheaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
