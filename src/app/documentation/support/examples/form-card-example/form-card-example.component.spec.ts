import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCardExampleComponent } from './form-card-example.component';

describe('FormCardExampleComponent', () => {
  let component: FormCardExampleComponent;
  let fixture: ComponentFixture<FormCardExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCardExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCardExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
