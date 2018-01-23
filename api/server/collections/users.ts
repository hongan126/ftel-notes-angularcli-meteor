import {MongoObservable} from 'meteor-rxjs';
import {User} from '../models';

export const Users = MongoObservable.fromExisting<User>(Meteor.users);
