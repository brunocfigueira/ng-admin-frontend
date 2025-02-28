import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsExampleComponent } from './tabs-example.component';

describe('TabsExampleComponent', () => {
  let component: TabsExampleComponent;
  let fixture: ComponentFixture<TabsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
