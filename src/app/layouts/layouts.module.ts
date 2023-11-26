import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LayoutsComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    NgbModule
  ]
})
export class LayoutsModule { }
