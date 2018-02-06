import {Subject} from 'rxjs/Subject';

export interface CommonChild {
  searchNote(searchStr: string);
}

let subscription;

export function eventSubscriber(action: Subject<any>, handler: (searchStr) => void, off: boolean = false) {
  if (off && subscription) {
    subscription.unsubscribe();
  } else {
    subscription = action.subscribe((searchStr) => handler(searchStr));
  }
}
