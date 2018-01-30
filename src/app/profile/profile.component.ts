import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Meteor} from "meteor/meteor";
import {User} from "../../../api/server/models";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  fgSignup: FormGroup;
  error = '';
  user: User;

  constructor(private fb: FormBuilder,
              private router: Router,
              private zone: NgZone,
              private app: AppComponent) {
  }

  ngOnInit() {
    this.fgSignup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
    this.user = Meteor.user();
  }

  editProfile() {
    Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        'profile.firstName': this.user.profile.firstName,
        'profile.lastName': this.user.profile.lastName
      }
    }, (err) => {
      this.zone.run(() => {
        if (!err) {
          this.router.navigate(['/']);
          this.app.setUserToShow();
        }
      });
    });
  }
}
