import {Injectable} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {SpinnerComponent} from '../../shared-components/common/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {
  }

  show(): void {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'loading-spinner-backdrop',
        panelClass: 'loading-spinner-panel',
        positionStrategy: this.overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically()
      });

      const spinnerPortal = new ComponentPortal(SpinnerComponent);
      this.overlayRef.attach(spinnerPortal);
    }
  }

  hide(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
