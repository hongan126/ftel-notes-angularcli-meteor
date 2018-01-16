export enum NoteType {
  TEXT = <any>'Text Note',
  TODO = <any>'Toto Note'
}

export interface NoteGroup {
  _id?: string;
  ownerId?: string;
  memberIds?: string[];
  name?: string;
}

export interface Todo {
  _id?: string;
  checked?: boolean;
  content?: string;
}

export interface Note {
  _id?: string;

  groupId?: string;
  ownerId?: string;

  title?: string;
  type?: NoteType;
  content?: string;
  todoList?: Todo[];
  createdAt?: Date;

}






