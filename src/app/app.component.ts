import {Component, ContentChild, NgZone, OnInit} from '@angular/core';
import {User} from '../../api/server/models';
import {Router} from '@angular/router';
import {Meteor} from 'meteor/meteor';
import {NotesManagerComponent} from './notes-manager/notes-manager.component';
import {SearchService} from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User = null;
  searchStr: string;

  constructor(public router: Router,
              public zone: NgZone,
              private searchService: SearchService) {
  }

  ngOnInit() {
    this.setUserToShow();
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

  onSearch() {
    // this.notesMgn.searchNote(this.searchStr);
    this.searchService.searchNote(this.searchStr);
  }
}
