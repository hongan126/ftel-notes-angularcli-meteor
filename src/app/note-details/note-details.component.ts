import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-note',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  todoItem: any;
  noteType = 'text';
  noteDetailsFg: FormGroup;
  todoList = [{name: 'Do something 1', checked: true}, {name: 'Do something 2', checked: false}];
  checked = true;

  constructor(public dialogRef: MatDialogRef<NoteDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder) {
  }

  ngOnInit() {
    this.noteDetailsFg = this.fb.group({
      title: ['', [Validators.required]],
      todoName: ['', [Validators.required]],
      todoItems: this.fb.array([this.fb.control('')])
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  setChecked(item: any) {
    item.checked = !item.checked;
  }

  addTodoItem(item: any) {
    this.todoList.push({name: item.toString(), checked: false});
    this.todoItem = '';
    this.noteDetailsFg.get('todoName').reset();

  }

  removeTodoItem(item: any) {
    this.todoList = this.todoList.filter(n => n != item);
  }

}
