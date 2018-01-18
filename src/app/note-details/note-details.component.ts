import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Note, NoteType, Todo} from '../../../api/server/models';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NoteDetailsComponent implements OnInit {
  noteDetailsFg: FormGroup;
  todoItem: any;
  noteType = 'text';
  todoList: Todo[] = [];
  newNote: Note;
  groupName: string;

  model: any = {};

  constructor(public dialogRef: MatDialogRef<NoteDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder) {
  }

  ngOnInit() {
    this.noteDetailsFg = this.fb.group({
      title: ['', [Validators.required]],
      todoName: ['', [Validators.required]],
      todoItems: this.fb.array([this.fb.control('')]),
      noteContent: ['', [Validators.required]]
    });
    this.groupName = this.data.groupName;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addTodoItem() {
    const todo: Todo = {_id: this.getTodoId(), content: this.model.todoItem, checked: false};
    this.todoList.push(todo);
    this.todoItem = '';
    this.noteDetailsFg.get('todoName').reset();

  }

  removeTodoItem(item: any) {
    this.todoList = this.todoList.filter(n => n !== item);
  }

  returnNote(): Note {
    if (this.noteType === 'text') {
      this.newNote = {
        groupId: this.data.groupId,
        title: this.model.title,
        type: NoteType.TEXT,
        content: this.model.noteContent
      };
    } else {
      this.newNote = {
        groupId: this.data.groupId,
        title: this.model.title,
        type: NoteType.TODO,
        todoList: this.todoList
      };
    }
    return this.newNote;
  }

  getTodoId(): number {
    if (this.todoList.length) {
      return Math.max.apply(Math, this.todoList.map(function (item) {
        return item._id;
      })) + 1;
    } else {
      return 1;
    }
  }
}
