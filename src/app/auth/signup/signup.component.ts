import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UiService } from '../../sheard/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  maxDate: Date = new Date();
  isLoading: boolean = false;
  isLoadingSubs: Subscription
  constructor(
    private authService:AuthService,
    private uiService: UiService
    ) { }
 

  ngOnInit(): void {
    this.maxDate.setFullYear((this.maxDate.getFullYear()) - 18)
    this.isLoadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
  }
  onSubmit(form: NgForm) {
  this.authService.registerUser({
    email:form.value.email,
    password:form.value.password
  })

  }

  ngOnDestroy(): void {
    if(this.isLoadingSubs)
    this.isLoadingSubs.unsubscribe()
  }
}
