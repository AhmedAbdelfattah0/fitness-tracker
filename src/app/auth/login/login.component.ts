import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/sheard/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy{
  isLoading: boolean = false;
  isLoadingSubs: Subscription
  buttonHide:boolean=true;
  constructor(
    private authService: AuthService,
    private uiService: UiService

  ) { }
 
  ngOnInit(): void {
    this.isLoadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
  }
  onSubmit(form: NgForm) {
    this.buttonHide=false;
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })

  }

  ngOnDestroy(): void {
    if( this.isLoadingSubs)
    this.isLoadingSubs.unsubscribe()
  }
}
