import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NoteGroupAddComponent} from '../note-group/note-group.add.component';
import {MatDialog} from '@angular/material';
import {NoteGroupRemoveComponent} from '../note-group/note-group.remove.component';
import {ShareManagerRemoveComponent} from '../share-manager/share-manager.remove.component';
import {NoteDetailsComponent} from '../note-details/note-details.component';
import {Note, NoteGroup, NoteType, Todo} from '../../../api/server/models';
import {Notes} from '../../../api/server/collections';
import {NoteGroups} from '../../../api/server/collections/groups';
import {MeteorObservable} from 'meteor-rxjs';
import {NoteRemoveComponent} from '../note-details/note.remove.component';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

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
  noteGroups;
  selectedGroup: NoteGroup;
  notesList;
  newNote: Note;

  groupName;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadNoteGroup();
  }

  loadNoteGroup() {
    this.noteGroups = NoteGroups.find({}, {sort: {createdAt: -1}});
  }

  loadNoteList(group: NoteGroup) {
    if (group === this.selectedGroup) {
      this.selectedGroup = null;
      this.notesList = [];
    } else {
      this.selectedGroup = group;
      this.notesList = Notes.find({groupId: group._id}, {sort: {createdAt: -1}});
    }
  }

//Dialog: Add Note Group
  openNoteGroupAddDialog(): void {
    const dialogRef = this.dialog.open(NoteGroupAddComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Note NoteGroup Add dialog was closed');
      if (!result) return;
      this.groupName = result;
      MeteorObservable.call('addGroup', this.groupName).zone()
        .subscribe(() => {
          // Zero the input field
          this.groupName = '';
        });
    });
  }

//Dialog: Remove Group
  openNoteGroupRemoveDialog(): void {
    const dialogRef = this.dialog.open(NoteGroupRemoveComponent, {
      width: '40%',
      data: {projectName: this.selectedGroup.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Note NoteGroup Remove dialog was closed');
      if (!result) return;
      MeteorObservable.call('removeGroup', result).zone()
        .subscribe(() => {
          //Null selected group
          this.selectedGroup = null;
        });
    });
  }

//Dialog: Remove a member can edit note from group
  openShareManagerRemoveDialog(): void {
    const dialogRef = this.dialog.open(ShareManagerRemoveComponent, {
      width: '40%',
      data: {personName: 'Person a demo'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Share Manager Remove dialog was closed');
      if (!result) return;
    });
  }

//Dialog: NEW NOTE, or Note Details to Edit
  openNoteDialog(note: Note): void {
    //note!=null => edit note
    if (note) {
      const dialogRef = this.dialog.open(NoteDetailsComponent, {
        width: '40%',
        data: {typeDialog: 'edit-note', note: note, groupName: this.selectedGroup.name}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The Edit note dialog was closed');
        if (!result) return;
        MeteorObservable.call('updateNote', <Note>result).zone()
          .subscribe(() => {
          });
      });

    }
    //note==null => new note
    else {
      const dialogRef = this.dialog.open(NoteDetailsComponent, {
        width: '40%',
        data: {typeDialog: 'add-new-note', groupName: this.selectedGroup.name, groupId: this.selectedGroup._id}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The New note dialog was closed');
        if (!result) return;
        this.newNote = <Note>result;
        MeteorObservable.call('addNote', this.newNote).zone()
          .subscribe(() => {
          });
      });
    }
  }

//Dialog: Remove note
  openRemoveNoteDialog(note: Note): void {
    const dialogRef = this.dialog.open(NoteRemoveComponent, {
      width: '40%',
      data: {groupName: this.selectedGroup.name, noteTitle: note.title, id: note._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Remove note dialog was closed');
      if (!result) return;
      MeteorObservable.call('removeNote', result.id).zone()
        .subscribe(() => {
        });
    });
  }

//update checked field of to-do item in mongoDb
  todoItemChange(todo: Todo, note: Note): void {
    todo.checked = !todo.checked;
    MeteorObservable.call('updateCheckedTodoInNote', note._id, todo._id, todo.checked).zone()
      .subscribe(() => {
      });
  }

  isTextNote(type: NoteType): boolean {
    if (type === NoteType.TEXT) {
      return true;
    }
    return false;
  }

  setPositionForNote(groupId: string, noteId: string, moveTop: boolean): void {
    MeteorObservable.call('setCreatedDate', groupId, noteId, moveTop).zone()
      .subscribe(() => {
      });
  }
}
