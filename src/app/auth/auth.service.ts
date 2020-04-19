import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private traningService: TrainingService

  ) { }


  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true

        this.authChange.next(true);
        this.router.navigate(['training'])
      } else {
        this.traningService.cancelSubscriptions()
        this.authChange.next(false);
        this.router.navigate(['login'])
        this.isAuthenticated = false;
      }
    })
  }
  registerUser(authData: AuthData) {
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)

  }

  login(authData: AuthData) {

    this.auth.signInWithEmailAndPassword(authData.email, authData.password)

  }

  logout() {
    
     this.auth.signOut()

  }

  // getUser() {
  //   return { ...this.user }
  // }

  isAuth() {
    return this.isAuthenticated;
  }

 
}
