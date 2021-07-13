import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from './layout/layout.module';
import { CategoryModule } from './category/category.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProductModule } from './product/product.module';


@NgModule({
  declarations: [
    AppComponent,
    DialogConfirmationComponent
  ],
  entryComponents: [DialogConfirmationComponent],
  imports: [
    BrowserModule,
    MatSidenavModule,
    LayoutModule,
    AppRoutingModule,
    CategoryModule,
    ProductModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
