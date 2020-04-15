import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit ,OnDestroy{
  @Output('onCloseSidenav') onCloseSidenav = new EventEmitter<void>()
  isAuth: boolean=false;
  authSubscription:Subscription
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubscription =  this.authService.authChange.subscribe(authStatus=>{
      this.isAuth=authStatus;
    });
  }
  onClose() {
    this.onCloseSidenav.emit();
    this.logout()
  }

  logout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
