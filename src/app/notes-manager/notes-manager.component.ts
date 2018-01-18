import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NoteGroupAddComponent} from '../note-group/note-group.add.component';
import {MatDialog} from '@angular/material';
import {NoteGroupRemoveComponent} from '../note-group/note-group.remove.component';
import {ShareManagerRemoveComponent} from '../share-manager/share-manager.remove.component';
import {NoteDetailsComponent} from '../note-details/note-details.component';
import {Note, NoteGroup, NoteType} from '../../../api/server/models';
import {Notes} from '../../../api/server/collections';
import {NoteGroups} from '../../../api/server/collections/groups';
import {delay} from 'rxjs/operators';
import {MeteorObservable} from 'meteor-rxjs';

@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesManagerComponent implements OnInit {
  noteGroups: NoteGroup[];
  selectedGroup: NoteGroup;
  notesList: Note[];
  newNote: Note;

  groupName;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadNoteGroup();
  }

  loadNoteGroup() {
    NoteGroups.find({}, {sort: {createdAt: -1}}).subscribe((groups: NoteGroup[]) => {
      this.noteGroups = groups;
    });
  }

  loadNoteList(group: NoteGroup) {
    this.selectedGroup = group;
    Notes.find({groupId: group._id}, {sort: {createdAt: -1}}).subscribe((notes: Note[]) => {
      this.notesList = notes;
    });
  }

  // Add Note Group
  openNoteGroupAddDialog(): void {
    const dialogRef = this.dialog.open(NoteGroupAddComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Note NoteGroup Add dialog was closed');
      this.groupName = result;
      MeteorObservable.call('addGroup', this.groupName).zone()
        .subscribe(() => {
          // Zero the input field
          this.groupName = '';
        });
    });
  }

  openNoteGroupRemoveDialog(): void {
    const dialogRef = this.dialog.open(NoteGroupRemoveComponent, {
      width: '40%',
      data: {projectName: this.selectedGroup.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Note NoteGroup Remove dialog was closed');
      MeteorObservable.call('removeGroup', result).zone()
        .subscribe(() => {
          //Null selected group
          this.selectedGroup = null;
        });
    });
  }

  openShareManagerRemoveDialog(): void {
    const dialogRef = this.dialog.open(ShareManagerRemoveComponent, {
      width: '40%',
      data: {personName: 'Person a demo'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Share Manager Remove dialog was closed');
      // this.projectName = result;

    });
  }

  openNewNoteDialog(): void {
    const dialogRef = this.dialog.open(NoteDetailsComponent, {
      width: '40%',
      data: {type: 'add-new-note', groupName: this.selectedGroup.name, groupId: this.selectedGroup._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The New note dialog was closed');
      this.newNote = <Note>result;
      MeteorObservable.call('addNote', this.newNote).zone()
        .subscribe(() => {
        });
    });
  }

  deleteNote(id: any): void {
    MeteorObservable.call('removeNote', id).zone()
      .subscribe(() => {
      });
  }

  isTextNote(type: NoteType): boolean {
    if (type === NoteType.TEXT) {
      return true;
    }
    return false;
  }

  loadNoteCard(): boolean {
    delay(1000);
    return true;
  }

  // findNote(): Observable<Note[]> {
  //   return Notes.find();
  // }
}
