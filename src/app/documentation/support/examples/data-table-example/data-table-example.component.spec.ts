import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableExampleComponent } from './data-table-example.component';

describe('DataTableExampleComponent', () => {
  let component: DataTableExampleComponent;
  let fixture: ComponentFixture<DataTableExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
