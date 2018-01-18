import {Meteor} from 'meteor/meteor';
import * as moment from 'moment';
import {Notes} from './collections/notes';
import {NoteType} from './models';
import {NoteGroups} from './collections/groups';

Meteor.startup(() => {
  // Notes.insert({
  //   title: 'Note number 3',
  //   type: NoteType.TEXT,
  //   content: 'Note for some thing A',
  //   createdAt: new Date()
  // });
  // Notes.insert({
  //   title: 'Note number 4',
  //   type: NoteType.TODO,
  //   todoList: [{checked: true, content: 'Todo something 1'},  {checked: false, content: 'Todo something 2'}],
  //   createdAt: moment().subtract(4, 'days').toDate()
  // });
  // NoteGroups.insert({
  //   name: 'Project 3',
  //   createdAt: new Date()
  // });
  // NoteGroups.insert({
  //   name: 'Project 4',
  //   createdAt: moment().subtract(4, 'months').toDate()
  // });
});
