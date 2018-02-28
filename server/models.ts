export enum NoteType {
  TEXT = 'text note',
  TODO = 'todo note'
}

export interface NoteGroup {
  _id?: string;
  ownerId?: string;
  memberIds?: string[];
  name?: string;
  createdAt?: Date;
}

export interface Todo {
  _id?: number;
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

export interface User extends Meteor.User {
  profile?: {
    firstName?: string;
    lastName?: string;
  };
}






