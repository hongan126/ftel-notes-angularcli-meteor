import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NoteGroupAddComponent} from '../note-group/note-group.add.component';
import {MatDialog} from '@angular/material';
import {NoteGroupRemoveComponent} from '../note-group/note-group.remove.component';
import {ShareManagerRemoveComponent} from '../share-manager/share-manager.remove.component';
import {NoteDetailsComponent} from '../note-details/note-details.component';
import {Note, NoteGroup, NoteType} from '../../../api/server/models';
import {Notes} from '../../../api/server/collections';
import {NoteGroups} from '../../../api/server/collections/groups';

@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesManagerComponent implements OnInit {
  noteGroups: NoteGroup[];
  groupName;
  projectName = 'Project A';
  notesList: Note[];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    Notes.find({}).subscribe((notes: Note[]) => {
      this.notesList = notes;
    });
    NoteGroups.find({}).subscribe((groups: Note[]) => {
      this.noteGroups = groups;
    });
  }

  openNoteGroupAddDialog(): void {
    const dialogRef = this.dialog.open(NoteGroupAddComponent, {
      width: '40%',
      data: {name: this.groupName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Note NoteGroup Add dialog was closed');
      this.groupName = result;
      if (this.groupName) {
        this.noteGroups.unshift(this.groupName);
      }
    });
  }

  openNoteGroupRemoveDialog(): void {
    const dialogRef = this.dialog.open(NoteGroupRemoveComponent, {
      width: '40%',
      data: {projectName: this.projectName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Note NoteGroup Remove dialog was closed');
      this.projectName = result;
      this.noteGroups = this.noteGroups.filter(n => n !== this.projectName);
    });
  }

  openShareManagerRemoveDialog(): void {
    const dialogRef = this.dialog.open(ShareManagerRemoveComponent, {
      width: '40%',
      data: {personName: this.projectName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Share Manager Remove dialog was closed');
      // this.projectName = result;

    });
  }

  openNewNoteDialog(): void {
    const dialogRef = this.dialog.open(NoteDetailsComponent, {
      width: '40%',
      data: {personName: this.projectName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The New note dialog was closed');
      // this.projectName = result;

    });
  }

  // findNote(): Observable<Note[]> {
  //   return Notes.find();
  // }
}
