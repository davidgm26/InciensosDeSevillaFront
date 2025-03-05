import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCounter = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  baseUrl = environment.baseURL

  constructor(private ngZone: NgZone) {}

  show() {
    this.ngZone.run(() => {
      this.loadingCounter++;
      this.loadingSubject.next(true);
    });
  }

  hide() {
    this.ngZone.run(() => {
      this.loadingCounter--;
      if (this.loadingCounter <= 0) {
        this.loadingCounter = 0;
        this.loadingSubject.next(false);
      }
    });
  }

  isLoading(): boolean {
    return this.loadingCounter > 0;
  }
}
