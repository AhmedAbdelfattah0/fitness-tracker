import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/sheard/ui.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from "@ngrx/store";
import * as formRoot from "../../app.reducer";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>
  isLoadingSubs: Subscription
  buttonHide: boolean = true;
  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<formRoot.State>


  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(formRoot.getIsLoading)
    // this.isLoadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // })
  }
  onSubmit(form: NgForm) {
    this.buttonHide = false;
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })

  }

  // ngOnDestroy(): void {
  //   if (this.isLoadingSubs)
  //     this.isLoadingSubs.unsubscribe()
  // }
}
