import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomPaginatorIntl} from './shared-components/intl/custom-paginator-intl';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    // outros components aqui
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    CommonModule,
    OverlayModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: CustomPaginatorIntl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

