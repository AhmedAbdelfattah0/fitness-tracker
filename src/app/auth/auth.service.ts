import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../sheard/ui.service';
import { Store } from "@ngrx/store";
import * as formRoot from "../app.reducer";
import * as UI from "../sheard/ui.actions";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private traningService: TrainingService,
    private uiService: UiService,
    private store: Store<{ ui: formRoot.State }>

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
        this.router.navigate(['auth/login'])
        this.isAuthenticated = false;
      }
    })
  }
  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true)
    this.store.dispatch(new UI.StartLoading())

    this.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(res => {

      this.uiService.showSnackBar('You have successfully register', 'Close', 4000)

      // this.uiService.loadingStateChanged.next(false)
      this.store.dispatch(new UI.StopLoading())

      this.router.navigate(['auth/login'])

    }).catch((error: Response) => {
      this.uiService.showSnackBar(error, 'Close', 4000)

      // this.uiService.loadingStateChanged.next(false)
      this.store.dispatch(new UI.StopLoading())


    })

  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true)
    this.store.dispatch(new UI.StartLoading())

    this.auth.signInWithEmailAndPassword(authData.email, authData.password).then(res => {

      this.uiService.showSnackBar('You have successfully logged in', 'Close', 4000)

      // this.uiService.loadingStateChanged.next(false)
      this.store.dispatch(new UI.StopLoading())

    }).catch((error) => {
      this.uiService.showSnackBar(error, 'Close', 4000)
      // this.uiService.loadingStateChanged.next(false)
      this.store.dispatch(new UI.StopLoading())


    })


  }

  logout() {

    this.auth.signOut()

  }


  isAuth() {
    return this.isAuthenticated;
  }


}
