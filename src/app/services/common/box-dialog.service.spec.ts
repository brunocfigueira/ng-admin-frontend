import {TestBed} from '@angular/core/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {BoxDialogService} from './box-dialog.service';
import {WindowSizeService} from './window-size.service';
import {APP_CONST} from '../../constants/app-constants';
import {DialogActionButtonsType} from '../../shared-components/types/dialog-type';

describe('BoxDialogService', () => {
  let service: BoxDialogService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;
  let windowSizeServiceSpy: jasmine.SpyObj<WindowSizeService>;

  beforeEach(() => {
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    const sanitizerMock = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);
    const windowSizeServiceMock = jasmine.createSpyObj('WindowSizeService', [
      'getCurrentHeightByPercentage',
      'getCurrentWidthByPercentage',
    ]);

    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        BoxDialogService,
        {provide: MatDialog, useValue: dialogMock},
        {provide: DomSanitizer, useValue: sanitizerMock},
        {provide: WindowSizeService, useValue: windowSizeServiceMock},
      ],
    });

    service = TestBed.inject(BoxDialogService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    sanitizerSpy = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
    windowSizeServiceSpy = TestBed.inject(WindowSizeService) as jasmine.SpyObj<WindowSizeService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a confirmation dialog', () => {
    const message = 'Confirmation Message';
    // @ts-ignore
    const actions: DialogActionButtonsType[] = [{label: 'Ok', action: 'confirm'}];
    const color = '#123456';
    const size = 400;

    sanitizerSpy.bypassSecurityTrustHtml.and.callFake((html: string) => `Sanitized: ${html}` as SafeHtml);

    service.openBoxDialogConfirmation(message, actions, size, color);

    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith(message);
    expect(dialogSpy.open).toHaveBeenCalled();
    const dialogData = dialogSpy.open.calls.mostRecent().args[1]?.data;
    // @ts-ignore
    expect(dialogData.title).toEqual(APP_CONST.DIALOG.BOX_CONFIRMATION.TITLE);
    // @ts-ignore
    expect(dialogData.message).toEqual(`Sanitized: ${message}`);
    // @ts-ignore
    expect(dialogData.backgroundColor).toEqual(color);
    // @ts-ignore
    expect(dialogData.actions).toEqual(actions);
    // @ts-ignore
    expect(dialogData.contentHeight).toEqual(service.maxContentHeight);
  });

  it('should open an attention dialog', () => {
    const message = 'Attention Message';
    // @ts-ignore
    const actions: DialogActionButtonsType[] = [{label: 'Cancel', action: 'cancel'}];
    const size = 300;

    sanitizerSpy.bypassSecurityTrustHtml.and.callFake((html: string) => `Sanitized: ${html}` as SafeHtml);

    service.openBoxDialogAttention(message, actions, size);

    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith(message);
    expect(dialogSpy.open).toHaveBeenCalled();
    const dialogData = dialogSpy.open.calls.mostRecent().args[1]?.data;
    // @ts-ignore
    expect(dialogData.title).toEqual(APP_CONST.DIALOG.BOX_ATTENTION.TITLE);
    // @ts-ignore
    expect(dialogData.message).toEqual(`Sanitized: ${message}`);
  });

  it('should open an information dialog', () => {
    const message = 'Information Message';
    // @ts-ignore
    const actions: DialogActionButtonsType[] = [{label: 'Ok', action: 'confirm'}];
    sanitizerSpy.bypassSecurityTrustHtml.and.callFake((html: string) => `Sanitized: ${html}` as SafeHtml);

    service.openBoxDialogInformation(message, actions);

    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith(message);
    expect(dialogSpy.open).toHaveBeenCalled();
    const dialogData = dialogSpy.open.calls.mostRecent().args[1]?.data;
    // @ts-ignore
    expect(dialogData.title).toEqual(APP_CONST.DIALOG.BOX_INFORMATION.TITLE);
    // @ts-ignore
    expect(dialogData.message).toEqual(`Sanitized: ${message}`);
  });

  it('should open a textual dialog', () => {
    const title = 'Textual Title';
    const message = 'Textual Message';
    const actions: DialogActionButtonsType[] = [];
    const color = '#abcdef';
    const boxSize = 500;

    sanitizerSpy.bypassSecurityTrustHtml.and.callFake((html: string) => `Sanitized: ${html}` as SafeHtml);
    windowSizeServiceSpy.getCurrentHeightByPercentage.and.returnValue(100);

    service.openBoxDialogTextual(title, message, actions, boxSize, color);

    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith(message);
    expect(windowSizeServiceSpy.getCurrentHeightByPercentage).toHaveBeenCalledWith(0.35);
    expect(dialogSpy.open).toHaveBeenCalled();
    const dialogData = dialogSpy.open.calls.mostRecent().args[1]?.data;
    // @ts-ignore
    expect(dialogData.title).toEqual(title);
    // @ts-ignore
    expect(dialogData.message).toEqual(`Sanitized: ${message}`);
  });

  it('should open a default dialog', () => {
    const title = 'Default Title';
    const message = 'Default Message';
    // @ts-ignore
    const actions: DialogActionButtonsType[] = [{label: 'Close', action: 'close'}];
    windowSizeServiceSpy.getCurrentWidthByPercentage.and.returnValue(600);

    sanitizerSpy.bypassSecurityTrustHtml.and.callFake((html: string) => `Sanitized: ${html}` as SafeHtml);

    service.openBoxDialogDefault(title, message, actions);

    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith(message);
    expect(windowSizeServiceSpy.getCurrentWidthByPercentage).toHaveBeenCalledWith(0.5);
    expect(dialogSpy.open).toHaveBeenCalled();
    const dialogData = dialogSpy.open.calls.mostRecent().args[1]?.data;
    // @ts-ignore
    expect(dialogData.title).toEqual(title);
    // @ts-ignore
    expect(dialogData.message).toEqual(`Sanitized: ${message}`);
  });
});
