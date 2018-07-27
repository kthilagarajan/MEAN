import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../shared/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  constructor(private httpService: HTTPService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  doLogin({ value, valid }: { value: any, valid: boolean }) {
    this.httpService.login({}, value).subscribe((response: any) => {
      if (response.status) {
        localStorage.setItem("userToken",response.token)
        this.router.navigate(["/tasks"])
      } else {
        alert(response.err)
      }
    })
  }

  doRegister({ value, valid }: { value: any, valid: boolean }) {
    this.httpService.register({}, value).subscribe((response: any) => {
      if (response.status) {
        alert("Registration success! Perform Login!")
      } else {
        alert(response.err)
      }
    })
  }

}
