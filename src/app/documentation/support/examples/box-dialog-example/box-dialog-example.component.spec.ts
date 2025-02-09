import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDialogExampleComponent } from './box-dialog-example.component';

describe('BoxDialogExampleComponent', () => {
  let component: BoxDialogExampleComponent;
  let fixture: ComponentFixture<BoxDialogExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxDialogExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxDialogExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
