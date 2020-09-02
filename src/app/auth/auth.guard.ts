import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map,take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromApp from '../app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
      private authService: AuthService,
      private router: Router,
      private store: Store<fromApp.AppState>,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    boolean |
    UrlTree |
    Promise<boolean | UrlTree> |
    Observable<boolean | UrlTree>
  {
    //user is an object, use the pipe+map to return a boolean
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {return authState.user}),
      map(user=>{
      const isAuth = !!user;
      if(isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth'])
    }));
  }
}
