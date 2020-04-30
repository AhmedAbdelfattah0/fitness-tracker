import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {  Observable } from 'rxjs';

import { Store } from "@ngrx/store";
import * as formRoot from "../../app.reducer";
@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit {
  @Output('onCloseSidenav') onCloseSidenav = new EventEmitter<void>()
  isAuth$:Observable<boolean>;
   constructor(private authService:AuthService,
    private store: Store<formRoot.State>
    
    ) { }

  ngOnInit(): void {
  this.isAuth$ =  this.store.select(formRoot.getIsAuth)
  }
  onClose() {
    this.onCloseSidenav.emit();
    this.logout()
  }

  logout(){
    this.authService.logout()
  }

  
}
