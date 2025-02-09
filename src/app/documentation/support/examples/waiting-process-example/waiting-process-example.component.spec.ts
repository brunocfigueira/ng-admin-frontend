import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingProcessExampleComponent } from './waiting-process-example.component';

describe('WaitingProcessExampleComponent', () => {
  let component: WaitingProcessExampleComponent;
  let fixture: ComponentFixture<WaitingProcessExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitingProcessExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingProcessExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
