import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  map,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private widthSubject = new BehaviorSubject<number>(window.innerWidth);

  width$ = this.widthSubject.asObservable();

  get width(): number {
    return this.widthSubject.value;
  }

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth),
        startWith(window.innerWidth),
        takeUntil(this.destroy$),
      )
      .subscribe((width) => this.widthSubject.next(width));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
