import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
 
import { AuthGuard } from './auth/auth.guard';
   


const routes: Routes = [
  { path: '', component: WelcomeComponent ,canActivate:[AuthGuard]},
  {path:'training',loadChildren:() => import('./training/training.module').then(m => m.TrainingModule), canLoad:[AuthGuard],canActivate:[AuthGuard]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
