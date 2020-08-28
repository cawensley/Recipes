import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainheaderComponent } from './mainheader/mainheader.component';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";

@NgModule({
  declarations: [
    AppComponent,
    MainheaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
