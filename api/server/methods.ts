import {check, Match} from 'meteor/check';
import {NoteGroups} from './collections/groups';
import {Notes} from './collections/notes';
import {Note, NoteGroup, NoteType, User} from './models';
import {Users} from "./collections/users";

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
  addGroup(groupName: string): void {
    if (!Meteor.userId()) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to create a new group');
    }

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
      createdAt: new Date(),
      ownerId: Meteor.userId(),
      memberIds: []
    };

    NoteGroups.insert(newGroup);
  },
  removeGroup(notesGroupId: string): void {
    const group = NoteGroups.findOne({_id: notesGroupId});
    if (Meteor.userId() !== group.ownerId) {
      throw new Meteor.Error('not-owned',
        'You are not own this group.');
    }
    Notes.remove({groupId: notesGroupId})
    NoteGroups.remove({_id: notesGroupId});
  },
  removeNote(noteId: string): void {
    Notes.remove({_id: noteId});
  },
  addNote(note: Note): void {
    note.createdAt = new Date();
    note.ownerId = Meteor.userId();
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
  },
  findMemberEmail(memberEmail: string): User {
    return Accounts.findUserByEmail(memberEmail);
  },
  addMember(groupId: string, memberId: string): void {
    NoteGroups.update({_id: groupId}, {$push: {memberIds: memberId}});
  },
  removeMember(noteGroupId: string, memberId: string): void {
    NoteGroups.update({_id: noteGroupId}, {$pull: {memberIds: memberId}});
  },
  setPrivateNoteGroup(noteGroupId: string): void {
    const group = NoteGroups.findOne({_id: noteGroupId});
    if (Meteor.userId() !== group.ownerId) {
      throw new Meteor.Error('not-owned',
        'You are not own this group.');
    }
    NoteGroups.update({_id: noteGroupId}, {$set: {memberIds: []}});
  },
});
