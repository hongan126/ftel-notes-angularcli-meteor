import {check, Match} from 'meteor/check';
import {NoteGroups} from './collections/groups';
import {Notes} from './collections/notes';
import {Note, NoteType, User} from './models';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

const isOwned = (ownerId: string, msg: string) => {
  if (Meteor.userId() !== ownerId) {
    throw new Meteor.Error('not-owned',
      'You are not own ' + msg + '.');
  }
};

const isLoggingIn = () => {
  if (!Meteor.userId()) {
    throw new Meteor.Error('unauthorized',
      'User must be logged-in.');
  }
};

const isGroupExisted = (groupName: string) => {
  const groupExists = !!NoteGroups.collection.find({
    name: groupName,
    ownerId: Meteor.userId()
  }).count();

  if (groupExists) {
    throw new Meteor.Error('group-name-exists',
      'Group name already exists');
  }
};

Meteor.methods({
  addGroup(groupName: string): void {
    isLoggingIn();
    check(groupName, nonEmptyString);
    isGroupExisted(groupName);

    const newGroup = {
      name: groupName,
      createdAt: new Date(),
      ownerId: Meteor.userId(),
      memberIds: []
    };

    NoteGroups.insert(newGroup);
  },
  editGroup(groupName: string, groupId: string): void {
    isLoggingIn();
    check(groupName, nonEmptyString);
    isGroupExisted(groupName);

    NoteGroups.update({_id: groupId}, {$set: {name: groupName}});
  },
  removeGroup(notesGroupId: string): void {
    isLoggingIn();
    const group = NoteGroups.findOne({_id: notesGroupId});
    if (!group) {
      throw new Meteor.Error('group-not-exist', 'Group not exist.');
    }
    isOwned(group.ownerId, 'Group: "' + group.name + '"');
    Notes.remove({groupId: notesGroupId});
    NoteGroups.remove({_id: notesGroupId});
  },
  setGroupCreatedDate(groupId: string, moveTop: boolean): void {
    isLoggingIn();
    if (moveTop) {
      NoteGroups.update(
        {_id: groupId},
        {$set: {createdAt: new Date()}}
      );
    } else {
      const group = NoteGroups.findOne({
        $or: [
          {ownerId: Meteor.userId()},
          {memberIds: Meteor.userId()}
        ]
      }, {sort: {createdAt: 1}});
      const oldDate: Date = <Date>(group.createdAt);
      oldDate.setDate((<Date>(group.createdAt)).getDate() - 1);
      NoteGroups.update(
        {_id: groupId},
        {$set: {createdAt: oldDate}}
      );
    }
  },
  removeNote(noteId: string): void {
    isLoggingIn();
    const note = Notes.findOne({_id: noteId});
    if (!note) {
      throw new Meteor.Error('note-not-exist', 'Note not exist.');
    }
    // Todo delete or keep
    isOwned(note.ownerId, 'Note: "' + note.title + '"');
    Notes.remove({_id: noteId});
  },
  addNote(note: Note): void {
    isLoggingIn();
    note.createdAt = new Date();
    note.ownerId = Meteor.userId();
    Notes.insert(note);
  },
  updateCheckedTodoInNote(noteId: string, todoId: number, checked: boolean): void {
    isLoggingIn();
    const note = Notes.findOne({_id: noteId});
    if (!note) {
      throw new Meteor.Error('note-not-exist', 'Note not exist.');
    }
    // Todo delete or keep
    // isOwned(note.ownerId, note.title);
    Notes.update(
      {_id: noteId, 'todoList._id': todoId},
      {
        $set: {'todoList.$.checked': checked}
      }
    );
  },
  updateNote(note: Note): void {
    isLoggingIn();
    // Todo delete or keep
    isOwned(note.ownerId, note.title);
    if (note.type === NoteType.TEXT) {
      Notes.update(
        {_id: note._id},
        {$set: {title: note.title, content: note.content, createdAt: note.createdAt}}
      );
    } else {
      Notes.update(
        {_id: note._id},
        {$set: {title: note.title, todoList: note.todoList, createdAt: note.createdAt}}
      );
    }
  },
  setNoteCreatedDate(groupId: string, noteId: string, moveTop: boolean): void {
    isLoggingIn();
    if (moveTop) {
      Notes.update(
        {_id: noteId},
        {$set: {createdAt: new Date()}}
      );
    } else {
      const note = Notes.findOne({groupId: groupId}, {sort: {createdAt: 1}});
      const oldDate: Date = <Date>(note.createdAt);
      oldDate.setDate((<Date>(note.createdAt)).getDate() - 1);
      // console.log(oldDate.get);
      Notes.update(
        {_id: noteId},
        {$set: {createdAt: oldDate}}
      );
    }
  },
  findMemberEmail(memberEmail: string): User {
    // isLoggingIn();
    return Accounts.findUserByEmail(memberEmail);
  },
  addMember(groupId: string, memberId: string): void {
    isLoggingIn();
    const group = NoteGroups.findOne({_id: groupId});
    isOwned(group.ownerId, 'Group: "' + group.name + '"');
    NoteGroups.update({_id: groupId}, {$push: {memberIds: memberId}});
  },
  removeMember(noteGroupId: string, memberId: string): void {
    isLoggingIn();
    const group = NoteGroups.findOne({_id: noteGroupId});
    isOwned(group.ownerId, 'Group: "' + group.name + '"');
    NoteGroups.update({_id: noteGroupId}, {$pull: {memberIds: memberId}});
  },
  setPrivateNoteGroup(noteGroupId: string): void {
    isLoggingIn();
    const group = NoteGroups.findOne({_id: noteGroupId});
    isOwned(group.ownerId, 'Group: "' + group.name + '"');
    NoteGroups.update({_id: noteGroupId}, {$set: {memberIds: []}});
  },
});
