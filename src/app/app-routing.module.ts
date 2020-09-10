import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('../app/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../app/pages/home/home.module').then( m => m.HomePageModule),
      },
    ]
  },
  {
    path: 'settings',
    canLoad: [AuthGuard],
    loadChildren: () => import('../app/pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
