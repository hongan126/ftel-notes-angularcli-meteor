import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Accounts} from 'meteor/accounts-base';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../../../api/server/models";

// import { Meteor } from 'meteor/meteor';

export function forbiddenUsername(u: AbstractControl) {
  const users = ['manager', 'admin', 'manager@gmail.com', 'admin@gmail.com'];
  if (users.includes(u.value)) {
    return {'invalid-username': true};
  }
  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  fgSignup: FormGroup;
  hide = true;
  confPass: string;
  error = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private zone: NgZone) {
  }

  ngOnInit() {
    this.fgSignup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email, forbiddenUsername]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: [this.confPass, [Validators.required, Validators.minLength(8), Validators.pattern(this.confPass)]]
    });

  }

  signup() {
    Accounts.createUser({
      email: this.fgSignup.value.username,
      password: this.fgSignup.value.password,
      profile: {
        firstName: this.fgSignup.value.firstName,
        lastName: this.fgSignup.value.lastName
      }
    }, (err) => {
      if (err) {
        this.zone.run(() => {
          this.error = err.reason;
          console.log(err);
        });
      } else {
        this.zone.run(() => {
          this.error = '';
          console.log('Signup - ' + this.fgSignup.value.username);
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
