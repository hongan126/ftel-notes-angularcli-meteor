import {Meteor} from 'meteor/meteor';
import {Notes} from './collections/notes';

Meteor.startup(() => {
  Notes.insert({title: 'Note 121', content: 'Content111'});
});
