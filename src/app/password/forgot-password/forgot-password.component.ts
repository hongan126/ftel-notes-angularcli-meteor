import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MeteorObservable} from 'meteor-rxjs';
import {MatDialog} from '@angular/material';
import {AlertComponent} from '../../_alert/alert.component';
import {Accounts} from 'meteor/accounts-base';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ForgotPasswordComponent implements OnInit {
  fgForgotPass: FormGroup;
  error = '';
  disableBtn = false;
  hidenLoading = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private zone: NgZone,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fgForgotPass = this.fb.group({
      username: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.disableBtn = true;
    this.hidenLoading = false;
    MeteorObservable.call('findMemberEmail', this.fgForgotPass.value.username).subscribe((response) => {
      if (!response) {
        this.error = 'Can not find your email!';
        this.disableBtn = false;
        this.hidenLoading = true;
      } else {
        this.error = '';
        Accounts.forgotPassword({email: this.fgForgotPass.value.username}, (err) => {
          this.zone.run(() => {
            if (err) {
              console.log(err);
              this.error = err.reasons.error.reason;
            } else {
              this.dialog.open(AlertComponent, {
                data: {reason: 'Please check your email to reset your password!', type: 'success'}
              });
              this.router.navigate(['/']);
            }
          });
        });
      }
    });
  }
}
