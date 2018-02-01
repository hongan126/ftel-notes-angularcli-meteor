import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {AlertComponent} from "../../_alert/alert.component";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {
  fgResetPass: FormGroup;
  hide = true;
  hide1 = true;
  confPass: string;
  error = '';
  token: string;


  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private zone: NgZone,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fgResetPass = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: [this.confPass, [Validators.required, Validators.minLength(8), Validators.pattern(this.confPass)]]
    });
    this.token = this.route.snapshot.paramMap.get('token');
  }

  resetPassword() {
    Accounts.resetPassword(this.token, this.fgResetPass.value.newPassword,
      (err) => {
        this.zone.run(() => {
          if (!err) {
            this.router.navigate(['/login']);
            this.dialog.open(AlertComponent, {
              data: {reason: 'Change password successful!', type: 'success'}
            });
          } else {
            this.dialog.open(AlertComponent, {
              data: {reason: err.reason, type: 'error'}
            });
          }
        });
      });
  }
}
