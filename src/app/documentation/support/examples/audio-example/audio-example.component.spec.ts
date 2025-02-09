import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioExampleComponent } from './audio-example.component';

describe('AudioExampleComponent', () => {
  let component: AudioExampleComponent;
  let fixture: ComponentFixture<AudioExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
