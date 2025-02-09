import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonExampleComponent } from './action-button-example.component';

describe('ActionButtonExampleComponent', () => {
  let component: ActionButtonExampleComponent;
  let fixture: ComponentFixture<ActionButtonExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionButtonExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionButtonExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
