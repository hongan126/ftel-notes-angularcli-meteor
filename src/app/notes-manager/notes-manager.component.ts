import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NoteGroupAddComponent} from '../note-group/note-group.add.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.component.html',
  styleUrls: ['./notes-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesManagerComponent implements OnInit {
  noteGroups = ['Project A', 'Project B', 'Project C', 'Project B', 'Project C', 'Project B', 'Project C', 'Project B', 'Project C', 'Project B', 'Project C', 'Project B', 'Project C', 'Project B', 'Project C', 'Project B', 'Project C'];
  groupName;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {

  }

  openNoteGroupAddDialog(): void {
    const dialogRef = this.dialog.open(NoteGroupAddComponent, {
      width: '40%',
      data: {name: this.groupName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.groupName = result;
      if (this.groupName) {
        this.noteGroups.unshift(this.groupName);
      }
    });
  }

}
