import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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

  constructor(private fb: FormBuilder,
              private router: Router,
              private zone: NgZone) { }

  ngOnInit() {
    this.fgResetPass = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: [this.confPass, [Validators.required, Validators.minLength(8), Validators.pattern(this.confPass)]]
    });
  }

  resetPassword(){

  }
}
