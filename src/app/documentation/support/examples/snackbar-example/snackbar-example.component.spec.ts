import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SnackbarExampleComponent} from './snackbar-exemple.component';

describe('SnackbarExampleComponent', () => {
  let component: SnackbarExampleComponent;
  let fixture: ComponentFixture<SnackbarExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
