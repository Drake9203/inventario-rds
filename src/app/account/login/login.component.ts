import { SocialAuthService, SocialUser, GoogleLoginProvider  } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user!: SocialUser;
  loggedIn!: boolean;
  constructor(private authService: SocialAuthService, private router: Router) {
  }

  ngOnInit() {
    let onSession =  localStorage.getItem('googleUser')
    if(onSession){
      this.router.navigate(['/categorys']);
    } else {
        this.login()
    }
  }

  login(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      localStorage.setItem('googleUser', JSON.stringify(this.user))
      this.router.navigate(['/categorys']);
    });
  }

}


