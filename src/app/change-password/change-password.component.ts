import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
  fgSignup: FormGroup;
  hide = true;
  confPass: string;
  error = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private zone: NgZone) { }

  ngOnInit() {
    this.fgSignup = this.fb.group({
      oldPassword: ['', [Validators.required]],
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
