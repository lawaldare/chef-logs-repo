import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { Client } from '../../models/Client';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    // this.authService.getAuth().subscribe(auth => {
    //   if (auth) {
    //     this.isLoggedIn = true;
    //     this.loggedInUser = auth.email;
    //   } else {
    //     this.isLoggedIn = false;
    //   }
    // })

    if (this.authService.getAuth) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  onLogout() {
    this.authService.logout();
    this.toastr.warning('You are now logged out');
    this.router.navigate(['/login']);
  }
}
