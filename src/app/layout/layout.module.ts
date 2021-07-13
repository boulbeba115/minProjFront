import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
