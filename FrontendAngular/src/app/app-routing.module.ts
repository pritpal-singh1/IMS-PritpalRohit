import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './dynamic/brand/brand.component';
import { CategoryComponent } from './dynamic/category/category.component';
import { DashboardComponent } from './dynamic/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'brands', component: BrandComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  // { path: 'courses', component: CoursesComponent },
  // { path: 'blog', component: BlogComponent },
  // { path: 'contact', component: ContactComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
