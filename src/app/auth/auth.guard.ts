import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad ,Route} from '@angular/router';

import { Store } from "@ngrx/store";
import * as formRoot from "../app.reducer";
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor( private router:Router,
    private store: Store<formRoot.State>
    ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
    return this.store.select(formRoot.getIsAuth).pipe(take(1))
  
  }
  

  canLoad( route: Route,) {
    // if( this.store.select(formRoot.getIsAuth))
    return this.store.select(formRoot.getIsAuth).pipe(take(1));
    // else
    // return this.router.navigate(['login']) 
   }
}
