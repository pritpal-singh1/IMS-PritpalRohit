import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { KanbanComponent } from './kanban/kanban.component';
import {RoleConfigurationComponent} from './role-configuration/role-configuration.component';
import {CompanyDetailsComponent} from './company-details/company-details.component';
import { ProfileComponent } from './user-profile/profile/profile.component';
import { ResetPasswordComponent } from './user-profile/reset-password/reset-password.component';


const routes: Routes = [
    { path: '', component: DashboardComponent },
    // { path: 'role-configuration', component: RoleConfigurationComponent},
    { path: 'calendar', component: CalendarComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'kanban-board', component: KanbanComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'change-password', component: ResetPasswordComponent },
    { path: 'company-details', component: CompanyDetailsComponent },
    
    { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
    { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
    { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
    { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UIModule) },
    { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
    { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
    { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
    { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
    { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
    { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
    { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
    { path: 'expense', loadChildren: () => import('./expense/expense.module').then(m => m.ExpenseModule) },
    { path: 'sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule) },
    { path: 'purchase', loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule) },
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
    { path: 'onlineorders', loadChildren: () => import('./onlineorders/onlineorders.module').then(m => m.OnlineordersModule) },
    { path: 'role-configuration', loadChildren: () => import('./role-configuration/role-configuration.module').then(m => m.RoleConfigurationModule) },
    { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) },

  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
