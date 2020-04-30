import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
 import { NotAuthGuard } from './not-auth.guard';


const routes: Routes = [
   
  { path: 'auth/signup', component: SignupComponent  },
  { path: 'auth/login', component: LoginComponent },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
