import { NgModule } from '@angular/core';
  import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
 import { AngularFireAuthModule } from '@angular/fire/auth';
import { SheardModule } from '../sheard/sheard.module';
import { AuthRoutingModule } from './auth-routing.module';
 


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    
  ],
  imports: [
     SheardModule,
    AngularFireAuthModule,
    AuthRoutingModule,
   ]
})
export class AuthenticationModule { }
