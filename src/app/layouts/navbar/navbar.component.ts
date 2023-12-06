import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user!: SocialUser;
  ngOnInit() {
   let userString =  localStorage.getItem('googleUser')
   if(userString){
     this.user = JSON.parse(userString) as SocialUser
   }
  }
}
