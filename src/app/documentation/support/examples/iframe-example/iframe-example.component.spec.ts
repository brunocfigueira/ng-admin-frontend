import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeExampleComponent } from './iframe-example.component';

describe('IframeExampleComponent', () => {
  let component: IframeExampleComponent;
  let fixture: ComponentFixture<IframeExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IframeExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IframeExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
