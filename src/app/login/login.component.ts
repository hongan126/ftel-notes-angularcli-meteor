import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Meteor} from 'meteor/meteor';
import {AppComponent} from '../app.component';
import {Accounts} from "meteor/accounts-base";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginFg: FormGroup;
  hide = true;
  model: any = {};
  error = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private zone: NgZone,
              private app: AppComponent) {
  }

  ngOnInit() {
    this.loginFg = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginFg.valid) {
      Meteor.loginWithPassword(this.model.username, this.model.password, (err) => {
        this.zone.run(() => {
          if (err) {
            this.error = err.reason;
          } else {
            // console.log(Meteor.user());
            this.router.navigate(['/']);
          }
        });
        this.app.setUserToShow();
      });
    }
  }

  forgotPassword() {
    console.log(this.loginFg.value.username);
    Accounts.forgotPassword({email: this.loginFg.value.username}, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Done forgot email');
      }
    });
  }

}
