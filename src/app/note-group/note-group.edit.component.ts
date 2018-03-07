import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-note-group-edit',
  templateUrl: './note-group.edit.component.html',
})
export class NoteGroupEditComponent implements OnInit {
  groupName: string;

  constructor(public dialogRef: MatDialogRef<NoteGroupEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close(this.groupName);
  }

  ngOnInit() {
    this.groupName = this.data.groupName;
  }

}
