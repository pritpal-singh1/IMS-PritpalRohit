import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { DashboardComponent } from './dynamic/dashboard/dashboard.component';
import { RolesComponent } from './dynamic/roles/roles.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
