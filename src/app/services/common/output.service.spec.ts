import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { OutputService } from './output.service';
import { SnackbarComponent } from '../../shared-components/common/snackbar/snackbar.component';
import { APP_CONST } from '../../constants/app-constants';

describe('OutputService', () => {
  let service: OutputService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OutputService,
        {
          provide: MatSnackBar,
          useValue: {
            openFromComponent: jasmine.createSpy('openFromComponent')
          }
        }
      ]
    });

    service = TestBed.inject(OutputService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showShortMessageSuccess', () => {
    it('should call showShortMessage with success color', () => {
      const message = 'Success message';
      const duration = 3000;

      service.showShortMessageSuccess(message, duration);

      expect(snackBar.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
        duration: duration,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
        data: { message, icon: 'close', color: 'success' }
      });
    });
  });

  describe('showShortMessageError', () => {
    it('should call showShortMessage with error color', () => {
      const message = 'Error message';
      const duration = 3000;

      service.showShortMessageError(message, duration);

      expect(snackBar.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
        duration: duration,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
        data: { message, icon: 'close', color: 'error' }
      });
    });
  });

  describe('showShortMessageWarning', () => {
    it('should call showShortMessage with warning color', () => {
      const message = 'Warning message';
      const duration = 3000;

      service.showShortMessageWarning(message, duration);

      expect(snackBar.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
        duration: duration,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
        data: { message, icon: 'close', color: 'warning' }
      });
    });
  });

  describe('showShortMessageInfo', () => {
    it('should call showShortMessage with info color', () => {
      const message = 'Info message';
      const duration = 3000;

      service.showShortMessageInfo(message, duration);

      expect(snackBar.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
        duration: duration,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-info'],
        data: { message, icon: 'close', color: 'info' }
      });
    });
  });

  describe('showShortMessageDefault', () => {
    it('should call showShortMessage with default color', () => {
      const message = 'Default message';
      const duration = 3000;

      service.showShortMessageDefault(message, duration);

      expect(snackBar.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
        duration: duration,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-default'],
        data: { message, icon: 'close', color: 'default' }
      });
    });
  });
});
