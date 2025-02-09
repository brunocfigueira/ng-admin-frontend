import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLeftComponent } from './sidenav-left.component';

describe('SidenavLeftComponent', () => {
  let component: SidenavLeftComponent;
  let fixture: ComponentFixture<SidenavLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
