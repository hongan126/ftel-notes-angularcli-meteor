import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Accounts} from "meteor/accounts-base";
import {AlertComponent} from "../../_alert/alert.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
  fgChangePass: FormGroup;
  hide = true;
  hide2 = true;
  hide3 = true;
  confPass: string;
  error = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private zone: NgZone,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fgChangePass = this.fb.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: [this.confPass, [Validators.required, Validators.minLength(8), Validators.pattern(this.confPass)]]
    });
  }

  changePass() {
    Accounts.changePassword(this.fgChangePass.value.oldPassword, this.fgChangePass.value.confirmPass,
      (err) => {
        this.zone.run(() => {
          if (err) {
            this.error = err.reason;
            console.log(err);
          } else {
            this.router.navigate(['/']);
            this.dialog.open(AlertComponent, {
              data: {reason: "Change password successful.", type: 'success'}
            });
          }
        });
      });
  }
}
