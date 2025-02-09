import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetNotifyComponent } from './bottom-sheet-notify.component';

describe('BottomSheetNotifyComponent', () => {
  let component: BottomSheetNotifyComponent;
  let fixture: ComponentFixture<BottomSheetNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetNotifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
