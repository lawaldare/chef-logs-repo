import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(regForm) {
    this.authService
      .login(regForm.value.email, regForm.value.password)
      .then(res => {
        this.toastr.success('You are now logged in');
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        this.toastr.error(err.message, 'Invalid Email or Password');
      });
  }
}
