import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Note, NoteType, Todo} from '../../../api/server/models';
import {UploadFileService} from '../upload-file.service';
import {style, trigger, state, transition, animate, keyframes} from '@angular/animations';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('imgState', [
      state('in', style({height: 0})),
      transition('* => void', [
        animate(2000, keyframes([
          style({transform: 'translateY(-80%)', height: 0, offset: 0}),
          style({transform: 'translateY(0)', height: '*', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class NoteDetailsComponent implements OnInit {
  noteDetailsFg: FormGroup;
  todoItem: any;
  noteType: string;
  todoList: Todo[] = [];
  newNote: Note;
  groupName: string;
  selectedFile: File;
  fileTypeError = false;
  imageLocation: string = '';
  disableBtn = false;

  model: any = {};
  note: Note;

  constructor(public dialogRef: MatDialogRef<NoteDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder, private uploadService: UploadFileService) {
  }

  ngOnInit() {
    this.noteType = 'text';
    this.groupName = this.data.groupName;
    if (this.data.note) {
      this.note = this.data.note;
      this.todoList = this.note.todoList;
      this.note.type === NoteType.TEXT ? this.noteType = 'text' : this.noteType = 'todo';
      if (this.note.image) {
        this.imageLocation =  this.note.image.toString();
      } else {
        this.note.image = '';
      }
    }

    this.noteDetailsFg = this.fb.group({
      title: ['', [Validators.required]],
      noteType: ['', [Validators.required]],
      todoName: ['', [Validators.required]],
      todoItems: this.fb.array([this.fb.control('')]),
      noteContent: ['', [Validators.required]],
      createdAt: [{value: '', disabled: true}, [Validators.required]]
    });
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
          content: this.model.noteContent,
        };
      } else {
        this.newNote = {
          groupId: this.data.groupId,
          title: this.model.title,
          type: NoteType.TODO,
          todoList: this.todoList,
        };
      }
      if (this.imageLocation) {
        this.newNote.image = this.imageLocation;
      }
      return this.newNote;
    } else {
      if (this.note.type === NoteType.TODO) {
        this.note.todoList = this.todoList;
      }
      if (this.imageLocation) {
        this.note.image = this.imageLocation;
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

  uploadFile() {
    const fileLocation = this.uploadService.uploadfile(this.selectedFile);
  }

  selectFile(event) {
    this.disableBtn = true;
    const files: FileList = event.target.files;
    this.selectedFile = files.item(0);
    console.log(this.selectedFile);
    if (this.selectedFile.type.includes('image')) {
      this.fileTypeError = false;
    } else {
      this.fileTypeError = true;
      return;
    }
    this.uploadService.uploadfile(this.selectedFile).then((data: any) => {
      console.log(data.Location.toString());
      this.imageLocation = data.Location.toString();
      this.disableBtn = false;
    });
  }

  deleteFile() {
    this.imageLocation = null;
    this.selectedFile = null;
    if (this.note) {
      this.note.image = '';
    }
  }
}
