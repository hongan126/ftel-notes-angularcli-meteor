import {MongoObservable} from 'meteor-rxjs';
import {Note} from '../models';

export const Notes = new MongoObservable.Collection<Note>('notes');
