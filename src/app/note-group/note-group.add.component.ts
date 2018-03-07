import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-note-group-add',
  templateUrl: './note-group.add.component.html',
})
export class NoteGroupAddComponent {
  groupName: string;

  constructor(public dialogRef: MatDialogRef<NoteGroupAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close(this.groupName);
  }
}
