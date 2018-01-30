import {AfterViewChecked, AfterViewInit, Component, NgZone, OnChanges, OnInit} from '@angular/core';
import {User} from '../../api/server/models';
import {Router} from '@angular/router';
import {Meteor} from 'meteor/meteor';
import {Users} from "../../api/server/collections/users";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User = null;

  constructor(public router: Router,
              public zone: NgZone) {
  }

  ngOnInit() {
    this.setUserToShow();
    Accounts.onResetPasswordLink((a) => {
      console.log(a);
      console.log('CCCCC');
    });
  }

  logout() {
    this.zone.run(() => {
      Meteor.logout();
      this.router.navigate(['/login']);
    });
    this.user = null;
  }

  setUserToShow() {
    !!Meteor.userId() ? this.user = Meteor.user() : this.user = null;
  }
}
