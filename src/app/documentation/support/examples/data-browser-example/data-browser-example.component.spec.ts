import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBrowserExampleComponent } from './data-browser-example.component';

describe('DataBrowserExampleComponent', () => {
  let component: DataBrowserExampleComponent;
  let fixture: ComponentFixture<DataBrowserExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataBrowserExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataBrowserExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
