import {Component, OnInit} from '@angular/core';
import {User} from '../../api/server/models';
import {Router} from '@angular/router';
import {Meteor} from 'meteor/meteor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User;

  constructor(public router: Router) {
    this.user = Meteor.user();
  }

  ngOnInit() {

  }

  logout() {
    Meteor.logout();
  }
}
