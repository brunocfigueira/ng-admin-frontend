import {Injectable, Injector} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BottomSheetService {
  private bottomSheetRef?: MatBottomSheetRef<any>;

  constructor(private bottomSheet: MatBottomSheet) {
  }

  open<T>(component: T, data?: any): MatBottomSheetRef<T> {
    this.bottomSheetRef = this.bottomSheet.open(component as any, {
      data,
    });

    return this.bottomSheetRef;
  }

  close(): void {
    if (this.bottomSheetRef) {
      this.bottomSheetRef.dismiss();
    }
  }

  afterDismissed(): Observable<any> | undefined {
    return this.bottomSheetRef?.afterDismissed();
  }

  backdropClick(): Observable<MouseEvent> | undefined {
    return this.bottomSheetRef?.backdropClick();
  }
}
