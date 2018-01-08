import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  model: any = {};
  hide = true;
  confPass: string;

  constructor(private fb: FormBuilder) {
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

}
