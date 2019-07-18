import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onSubmit(regForm) {
    this.authService
      .register(regForm.value.email, regForm.value.password)
      .then(res => {
        this.toastr.success('You are now registered and logged in');
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.toastr.error(err.message);
      });
  }
}
