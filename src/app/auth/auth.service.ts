import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Store} from "@ngrx/store";
import * as fromApp from '../app.reducer';
import * as AuthActions from './store/auth.actions';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  userToken = null;
  private tokenExpirationTimer: any;

  constructor(
      private http: HttpClient,
      private router: Router,
      private store: Store<fromApp.AppState>,
  ) {}

  getUserToken () {
    return this.userToken;
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    this.userToken = null;
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    //calculates on milliseconds
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id:string;
      _token:string;
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))
    if(!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));
    if(loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(new AuthActions.Login({
        email: loadedUser.email,
        userID: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate),
      }))
      const expirationLeft = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationLeft)
    }
  }

  signup(email: string,password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(AuthService.handleError),tap(resData =>{
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    }))
  }

  login(email: string,password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(AuthService.handleError),tap(resData =>{
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    }))
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number)
  {
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    this.userToken = token;
    const userData = new User(email, userId, token, expirationDate);
    // this.user.next(userData);
    this.store.dispatch(new AuthActions.Login({
      email: email,
      userID: userId,
      token: token,
      expirationDate: expirationDate,
    }))
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(userData))
  }

  private static handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if(!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage)
    }
    switch(errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect password entered';
        break;
    }
    return throwError(errorMessage)
  }

}
