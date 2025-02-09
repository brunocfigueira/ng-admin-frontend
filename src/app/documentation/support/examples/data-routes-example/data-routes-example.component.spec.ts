import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRoutesExampleComponent } from './data-routes-example.component';

describe('DataRoutesExampleComponent', () => {
  let component: DataRoutesExampleComponent;
  let fixture: ComponentFixture<DataRoutesExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataRoutesExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataRoutesExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
