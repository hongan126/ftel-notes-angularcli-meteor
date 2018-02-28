import {MongoObservable} from 'meteor-rxjs';
import {NoteGroup} from '../models';

export const NoteGroups = new MongoObservable.Collection<NoteGroup>('groups');
