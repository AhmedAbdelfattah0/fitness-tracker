import { Component, OnInit, EventEmitter, Output } from '@angular/core';
 import {  Observable } from 'rxjs';
import { Store } from "@ngrx/store";
 import * as formRoot from "../../app.reducer";
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output('sidenavToggle') sidenavToggle = new EventEmitter<void>()
  isAuth$:Observable<boolean>;
   constructor(
     private store: Store<formRoot.State>,private authService:AuthService
  ) { }
 

  ngOnInit(): void {
  this.isAuth$ =  this.store.select(formRoot.getIsAuth)


  }
  onSidenavToggle() {
    this.sidenavToggle.emit();
  }


  logout(){
    this.authService.logout()
  }
  
}
