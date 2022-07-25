import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  idUser?: any
  currentUser: string = "";
  avatar?: any
  fullName?: any
  checkRole = localStorage.getItem('ROLE');
  username: string | null = ''
  role?: any


  constructor(private authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.role = localStorage.getItem("ROLE")
    console.log(this.role)
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('USERNAME') != null) {
      // @ts-ignore
      this.currentUser = localStorage.getItem("currentUser")
      this.avatar = JSON.parse(this.currentUser).avatar;
      return true;
    }
    return false
  }

  logOut() {
    localStorage.clear();
    this.authService.logout();
  }

  checkHRF() {
    if (window.location.href == 'http://localhost:4200/user/listFriend' || window.location.href == 'http://localhost:4200/') {
      return true;
    }
    return false;
  }
}
