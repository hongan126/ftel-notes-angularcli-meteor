import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-note-remove',
  templateUrl: './note.remove.component.html',
})
export class NoteRemoveComponent {

  constructor(public dialogRef: MatDialogRef<NoteRemoveComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
