import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NoteGroupAddComponent} from '../note-group/note-group.add.component';
import {MatDialog} from '@angular/material';
import {NoteGroupRemoveComponent} from '../note-group/note-group.remove.component';
import {ShareManagerRemoveComponent} from '../share-manager/share-manager.remove.component';
import {NoteDetailsComponent} from '../note-details/note-details.component';
import {Note, NoteGroup, NoteType, Todo, User} from '../../../api/server/models';
import {Notes} from '../../../api/server/collections';
import {NoteGroups} from '../../../api/server/collections/groups';
import {MeteorObservable} from 'meteor-rxjs';
import {NoteRemoveComponent} from '../note-details/note.remove.component';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {NoteGroupInviteMemberComponent} from '../note-group/note-group.invite-member.component';
import {Users} from '../../../api/server/collections/users';
import {AlertComponent} from '../_alert/alert.component';

@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('loadState', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(0)', offset: 0}),
          style({opacity: 1, transform: 'translateX(0)', offset: 0.1}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class NotesManagerComponent implements OnInit {
  groupList;
  notesList;
  members;
  selectedGroup: NoteGroup;
  newNote: Note;
  groupName;
  user: User;
  rememberSelectedGroupId;


  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadNoteGroup();
    const that = this;
    this.groupList.observeChanges({
      changed(id, fieldsChanged) {
        if (that.selectedGroup._id === id) {
          that.selectedGroup = that.groupList._data.find(g => g._id === id);
          that.selectedGroup.memberIds = fieldsChanged.memberIds;
          that.loadMember();
        }
      },
      removed(id) {
        if (that.selectedGroup._id === id) {
          that.loadNoteList(that.selectedGroup);
        }
      }
    });
  }

  loadNoteGroup() {
    this.groupList = NoteGroups.find({
      $or: [
        {ownerId: Meteor.userId()},
        {memberIds: Meteor.userId()}
      ]
    }, {sort: {createdAt: -1}});
  }

  loadNoteList(group: NoteGroup) {
    if (group === this.selectedGroup) {
      this.selectedGroup = null;
      this.notesList = [];
      this.members = [];
    } else {
      this.selectedGroup = group;
      this.notesList = Notes.find({groupId: group._id}, {sort: {createdAt: -1}});
      this.loadMember();
    }
  }

  loadMember() {
    this.members = Users.find({_id: {$in: this.selectedGroup.memberIds}});
  }

// Dialog: Add Note Group
  openNoteGroupAddDialog(): void {
    const dialogRef = this.dialog.open(NoteGroupAddComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Note NoteGroup Add dialog was closed');
      if (!result) {
        return;
      }
      this.groupName = result;
      MeteorObservable.call('addGroup', this.groupName).zone()
        .subscribe(() => {
          this.groupName = '';
        }, (err) => {
          this.openAlert(err.reason);
        });
    });
  }

// Dialog: Remove Group
  openNoteGroupRemoveDialog(): void {
    if (!this.selectedGroup) {
      this.openAlert('Please choice a note group!');
      return;
    }

    const dialogRef = this.dialog.open(NoteGroupRemoveComponent, {
      width: '60%',
      data: {notesGroup: this.selectedGroup}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Note NoteGroup Remove dialog was closed');
      if (!result) {
        return;
      }
      MeteorObservable.call('removeGroup', result).zone()
        .subscribe(() => {
          // Null selected group
          this.loadNoteList(this.selectedGroup);
          this.selectedGroup = null;
        }, (err) => {
          this.openAlert(err.reason);
        });
    });
  }

// Dialog: Invite Member
  openInviteMemberDialog(): void {
    const dialogRef = this.dialog.open(NoteGroupInviteMemberComponent, {
      width: '60%',
      data: {groupName: this.selectedGroup.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Invite Member dialog was closed');
      this.rememberSelectedGroupId = this.selectedGroup._id;
      MeteorObservable.call('addMember', this.selectedGroup._id, result).zone()
        .subscribe(() => {
        }, (err) => {
          this.openAlert(err.reason);
        });
    });
  }

// Dialog: Remove a member can edit note from group
  openShareManagerRemoveDialog(member: User): void {
    const dialogRef = this.dialog.open(ShareManagerRemoveComponent, {
      width: '60%',
      data: {
        memberName: member.profile.firstName + ' ' + member.profile.lastName,
        memberId: member._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Share Manager Remove dialog was closed');
      if (!result) {
        return;
      }
      const memberId: string = result;
      MeteorObservable.call('removeMember', this.selectedGroup._id, memberId).zone()
        .subscribe(() => {
        }, (err) => {
          this.openAlert(err.reason);
        });
    });
  }

// Dialog: NEW NOTE, or Note Details to Edit
  openNoteDialog(note: Note): void {
    // note!=null => edit note
    if (note) {
      const dialogRef = this.dialog.open(NoteDetailsComponent, {
        width: '60%',
        data: {typeDialog: 'edit-note', note: note, groupName: this.selectedGroup.name}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The Edit note dialog was closed');
        if (!result) {
          return;
        }
        MeteorObservable.call('updateNote', <Note>result).zone()
          .subscribe(() => {
          }, (err) => {
            this.openAlert(err.reason);
          });
      });

    } else {
      // note==null => new note
      const dialogRef = this.dialog.open(NoteDetailsComponent, {
        width: '60%',
        data: {typeDialog: 'add-new-note', groupName: this.selectedGroup.name, groupId: this.selectedGroup._id}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The New note dialog was closed');
        if (!result) {
          return;
        }
        this.newNote = <Note>result;
        MeteorObservable.call('addNote', this.newNote).zone()
          .subscribe(() => {
          }, (err) => {
            this.openAlert(err.reason);
          });
      });
    }
  }

// Dialog: Remove note
  openRemoveNoteDialog(note: Note): void {
    const dialogRef = this.dialog.open(NoteRemoveComponent, {
      width: '60%',
      data: {groupName: this.selectedGroup.name, noteTitle: note.title, id: note._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Remove note dialog was closed');
      if (!result) {
        return;
      }
      MeteorObservable.call('removeNote', result.id).zone()
        .subscribe(() => {
        }, (err) => {
          this.openAlert(err.reason);
        });
    });
  }

// update checked field of to-do item in mongoDb
  todoItemChange(todo: Todo, note: Note): void {
    todo.checked = !todo.checked;
    MeteorObservable.call('updateCheckedTodoInNote', note._id, todo._id, todo.checked).zone()
      .subscribe(() => {
      }, (err) => {
        this.openAlert(err.reason);
      });
  }

  isTextNote(type: NoteType): boolean {
    if (type === NoteType.TEXT) {
      return true;
    }
    return false;
  }

// Open alert dialog
  openAlert(msg: string) {
    this.dialog.open(AlertComponent, {
      data: {reason: msg, type: 'error'}
    });
  }

  setPositionForNote(groupId: string, noteId: string, moveTop: boolean): void {
    MeteorObservable.call('setCreatedDate', groupId, noteId, moveTop).zone()
      .subscribe(() => {
      }, (err) => {
        this.openAlert(err.reason);
      });
  }

  isOwned(ownerId: string): boolean {
    return ownerId === Meteor.userId();
  }

  isEmptyMember(): boolean {
    if (this.selectedGroup.memberIds.length <= 0) {
      return true;
    }
    return false;
  }

  setPrivateNoteGroup() {
    this.rememberSelectedGroupId = this.selectedGroup._id;
    MeteorObservable.call('setPrivateNoteGroup', this.selectedGroup._id).zone()
      .subscribe(() => {
        this.selectedGroup = this.groupList._data.find(g => g._id === this.rememberSelectedGroupId);
        this.loadMember();
      }, (err) => {
        this.openAlert(err.reason);
      });
  }

  checkGroup(id: string) {
    if (!this.selectedGroup) {
      return false;
    }
    if (id === this.selectedGroup._id) {
      return true;
    }
    return false;
  }
}
