import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SearchService {
  subscription = new Subject();

  constructor() {
  }

  searchNote(searchStr: string) {
    this.subscription.next(searchStr);
  }
}
