import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoExampleComponent } from './video-example.component';

describe('VideoExampleComponent', () => {
  let component: VideoExampleComponent;
  let fixture: ComponentFixture<VideoExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
