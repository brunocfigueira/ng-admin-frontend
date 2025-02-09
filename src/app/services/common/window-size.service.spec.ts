import { TestBed } from '@angular/core/testing';
import { WindowSizeService } from './window-size.service';

describe('WindowSizeService', () => {
  let service: WindowSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit initial size on creation', (done) => {
    const expectedSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    service.size$.subscribe((size) => {
      expect(size).toEqual(expectedSize);
      done();
    });
  });



  it('should return current size synchronously with getCurrentSize()', () => {
    const currentSize = service.getCurrentSize();
    expect(currentSize).toEqual({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });



  it('should calculate height with getCurrentHeightByPercentage()', () => {
    const mockHeight = 800;
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(mockHeight);

    const percentage = 0.1; // 10%
    const expectedHeight = mockHeight - mockHeight * percentage;

    window.dispatchEvent(new Event('resize')); // Atualiza o BehaviorSubject

    const result = service.getCurrentHeightByPercentage(percentage);
    expect(result).toBeCloseTo(expectedHeight);
  });
});
