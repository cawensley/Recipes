import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromApp from '../app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
  userToken = null;
  private tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  getUserToken() {
    this.userToken = JSON.parse(localStorage.getItem('userData'))._token;
    return this.userToken
  }

  setLogoutTimer(expirationDuration: number) {
    //calculates on milliseconds
    this.tokenExpirationTimer = setTimeout(()=>{
      this.store.dispatch(new AuthActions.Logout())
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

}
