import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-note-group-remove',
  templateUrl: './note-group.remove.component.html',
})
export class NoteGroupRemoveComponent {

  constructor(public dialogRef: MatDialogRef<NoteGroupRemoveComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
