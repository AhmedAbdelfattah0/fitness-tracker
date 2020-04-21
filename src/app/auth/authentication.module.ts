import { NgModule } from '@angular/core';
  import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
 import { AngularFireAuthModule } from '@angular/fire/auth';
import { SheardModule } from '../sheard/sheard.module';
 


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    
  ],
  imports: [
     SheardModule,
    AngularFireAuthModule,
   ]
})
export class AuthenticationModule { }
