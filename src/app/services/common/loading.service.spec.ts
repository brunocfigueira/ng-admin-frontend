import { TestBed } from '@angular/core/testing';
import { Overlay, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;
  let overlaySpy: jasmine.SpyObj<Overlay>;
  let overlayRefSpy: jasmine.SpyObj<OverlayRef>;
  let positionBuilderSpy: jasmine.SpyObj<OverlayPositionBuilder>;

  beforeEach(() => {
    // Mock do OverlayRef
    const overlayRefMock = jasmine.createSpyObj('OverlayRef', ['attach', 'dispose']);
    // Mock do OverlayPositionBuilder
    const positionBuilderMock = jasmine.createSpyObj('OverlayPositionBuilder', ['global']);
    positionBuilderMock.global.and.returnValue({
      centerHorizontally: jasmine.createSpy('centerHorizontally').and.returnValue({
        centerVertically: jasmine.createSpy('centerVertically'),
      }),
    });
    // Mock do Overlay
    const overlayMock = jasmine.createSpyObj('Overlay', ['create', 'position']);
    overlayMock.create.and.returnValue(overlayRefMock);
    overlayMock.position.and.returnValue(positionBuilderMock);

    TestBed.configureTestingModule({
      providers: [
        LoadingService,
        { provide: Overlay, useValue: overlayMock },
      ],
    });

    service = TestBed.inject(LoadingService);
    overlaySpy = TestBed.inject(Overlay) as jasmine.SpyObj<Overlay>;
    overlayRefSpy = overlayMock.create() as jasmine.SpyObj<OverlayRef>;
    positionBuilderSpy = overlayMock.position() as jasmine.SpyObj<OverlayPositionBuilder>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('should dispose of overlayRef when hide is called', () => {
    service.show();
    service.hide();

    expect(overlayRefSpy.dispose).toHaveBeenCalled();
    expect(service['overlayRef']).toBeNull();
  });

  it('should not throw an error if hide is called without an overlayRef', () => {
    expect(() => service.hide()).not.toThrow();
    expect(overlayRefSpy.dispose).not.toHaveBeenCalled();
  });
});
