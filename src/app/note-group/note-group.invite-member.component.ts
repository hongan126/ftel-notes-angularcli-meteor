import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MeteorObservable} from "meteor-rxjs";
import {User} from "../../../api/server/models";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-note-group-invite',
  templateUrl: './note-group.invite-member.component.html',
  styleUrls: ['./note-group.invite-member.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(400, keyframes([
          style({opacity: 0, transform: 'translateX(10px)', offset: 0}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class NoteGroupInviteMemberComponent {
  memberEmail: string = '';
  memberId: string;
  memberName: string;
  showError: boolean = false;

  constructor(public dialogRef: MatDialogRef<NoteGroupInviteMemberComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  findMemberEmail() {
    MeteorObservable.call('findMemberEmail', this.memberEmail).subscribe((response) => {
      if (response) {
        const user: User = response;
        this.memberName = user.profile.firstName + ' ' + user.profile.lastName;
        this.memberId = user._id;
        this.showError = false;
      } else {
        this.showError = true;
        this.memberName = '';
        this.memberId = '';
      }
    });
  }
}
