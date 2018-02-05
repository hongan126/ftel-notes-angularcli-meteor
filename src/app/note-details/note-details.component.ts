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
  noteType: string;
  todoList: Todo[] = [];
  newNote: Note;
  groupName: string;

  model: any = {};
  note: Note;

  constructor(public dialogRef: MatDialogRef<NoteDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder) {
  }

  ngOnInit() {
    this.noteDetailsFg = this.fb.group({
      title: ['', [Validators.required]],
      noteType: ['', [Validators.required]],
      todoName: ['', [Validators.required]],
      todoItems: this.fb.array([this.fb.control('')]),
      noteContent: ['', [Validators.required]]
    });
    this.groupName = this.data.groupName;
    if (this.data.note) {
      this.note = this.data.note;
      this.todoList = this.note.todoList;
      this.note.type === NoteType.TEXT ? this.noteType = 'text' : this.noteType = 'todo';

    }
    this.noteType = 'text';
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
    if (this.data.typeDialog === 'add-new-note') {
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
    } else {
      if (this.note.type === NoteType.TODO) {
        this.note.todoList = this.todoList;
      }
      return this.note;
    }
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

  onChangeRdo(noteType) {
    console.log(noteType);
  }
}
