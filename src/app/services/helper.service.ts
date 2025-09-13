import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private helperStateSource = new Subject<boolean>();

  helperState$ = this.helperStateSource.asObservable();

  emitOpenHelper() {
    this.helperStateSource.next(true);
  }

  emitCloseHelper() {
    this.helperStateSource.next(false);
  }
}
