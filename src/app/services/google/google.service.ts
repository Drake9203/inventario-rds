import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private authService: SocialAuthService) {
    
  }
  loginGoogle(){
    this.authService.authState.subscribe((user) => {
     return user
    });
  }

}
