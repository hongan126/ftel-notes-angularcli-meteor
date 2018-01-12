import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-note-group-remove',
  templateUrl: './share-manager.remove.component.html',
})
export class ShareManagerRemoveComponent{

  constructor(public dialogRef: MatDialogRef<ShareManagerRemoveComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
