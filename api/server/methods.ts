import {check, Match} from 'meteor/check';
import {NoteGroups} from './collections/groups';
import {Notes} from './collections/notes';
import {Note, NoteType} from './models';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
  addGroup(groupName: string): void {
    // if (!this.userId) {
    //   throw new Meteor.Error('unauthorized',
    //     'User must be logged-in to create a new chat');
    // }

    check(groupName, nonEmptyString);

    const groupExists = !!NoteGroups.collection.find({
      name: groupName
    }).count();

    if (groupExists) {
      throw new Meteor.Error('group-name-exists',
        'Group name already exists');
    }

    const newGroup = {
      name: groupName,
      createdAt: new Date()
    };

    NoteGroups.insert(newGroup);
  },
  removeGroup(groupName: string): void {
    // if (!this.userId) {
    //   throw new Meteor.Error('unauthorized',
    //     'User must be logged-in to create a new chat');
    // }
    NoteGroups.remove({name: groupName});
  },
  removeNote(noteId: string): void {
    Notes.remove({_id: noteId});
  },
  addNote(note: Note): void {
    note.createdAt = new Date();
    Notes.insert(note);
  },
  updateCheckedTodoInNote(noteId: string, todoId: number, checked: boolean): void {
    Notes.update(
      {_id: noteId, 'todoList._id': todoId},
      {
        $set: {'todoList.$.checked': checked}
      }
    );
  },
  updateNote(note: Note): void {
    if (note.type === NoteType.TEXT) {
      Notes.update(
        {_id: note._id},
        {$set: {title: note.title, content: note.content}}
      );
    } else {
      Notes.update(
        {_id: note._id},
        {$set: {title: note.title, todoList: note.todoList}}
      );
    }
  },
  setCreatedDate(groupId: string, noteId: string, moveTop: boolean): void {
    if (moveTop) {
      Notes.update(
        {_id: noteId},
        {$set: {createdAt: new Date()}}
      );
    } else {
      const note = Notes.findOne({groupId: groupId}, {sort: {createdAt: 1}});
      var oldDate: Date = new Date();
      oldDate.setDate((<Date>(note.createdAt)).getDate() - 1);
      Notes.update(
        {_id: noteId},
        {$set: {createdAt: oldDate}}
      );
    }
  }
});
