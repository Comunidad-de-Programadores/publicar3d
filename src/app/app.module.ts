import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ARHeaderComponent } from './shared/arheader/arheader.component';
import { ARElementComponent } from './shared/arelement/arelement.component';
import { AnnotationsComponent } from './shared/annotations/annotations.component';
import { AfelementComponent } from './shared/afelement/afelement.component';

@NgModule({
  declarations: [
    AppComponent,
    ARHeaderComponent,
    ARElementComponent,
    AnnotationsComponent,
    AfelementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
