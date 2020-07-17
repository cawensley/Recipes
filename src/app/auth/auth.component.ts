import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authObservable: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router){}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if(this.isLoginMode) {
      this.authObservable = this.authService.login(email,password)
    } else {
      this.authObservable = this.authService.signup(email, password)
    }
    this.authObservable.subscribe(
      responseData => {
        this.isLoading=false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log("Error thrown is =",errorMessage);
        this.error = errorMessage;
        this.isLoading=false
      }
    )

    form.reset()
  }

  onHandleClose() {
    this.error = null;
  }
}
