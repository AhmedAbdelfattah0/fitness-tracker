import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

import { Store } from "@ngrx/store";
import * as formRoot from "../app.reducer";
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router
   , private store: Store<formRoot.State>
    ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if( this.store.select(formRoot.getIsAuth).pipe(take(1)))
      return this.router.navigate(['training']);
      else
      return true
  }
  
}
