import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { GoogleGuard } from './guards/google.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    loadChildren: () =>
    import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [GoogleGuard]
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
