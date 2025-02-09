import {Component, OnInit} from '@angular/core';
import {ActionButtonComponent} from "../../../../shared-components/common/action-button/action-button.component";
import {VideoAttributesSourcesType, VideoType} from '../../../../shared-components/types/video-type';
import {VideoComponent} from '../../../../shared-components/common/video/video.component';

@Component({
  selector: 'app-video-example',
  imports: [
    ActionButtonComponent,
    VideoComponent
  ],
  templateUrl: './video-example.component.html',
  styleUrl: './video-example.component.scss'
})
export class VideoExampleComponent implements OnInit {
  protected title: string = '';
  protected subtitle: string = '';
  protected src: string = '';
  protected poster: string = '';
  protected videos: VideoAttributesSourcesType[] = []
  protected type: VideoType = "video/mp4";
  protected isPlaylist = false;

  ngOnInit() {
    // examples: https://www.videvo.net/#rs=videvo-logo
    this.loadDefaultValues();
  }

  private loadDefaultValues(): void {
    this.title = 'Content Only Video';
    this.subtitle = 'Presentation of the content of an external video within the video tag';
    this.poster = 'https://videocdn.cdnpk.net/videos/e3457efa-bdba-5ade-9764-6c4bf811ffe9/horizontal/thumbnails/large.jpg'
    this.src = 'https://videocdn.cdnpk.net/videos/e3457efa-bdba-5ade-9764-6c4bf811ffe9/horizontal/previews/videvo_watermarked/large.mp4';
    this.type = 'video/mp4';
    this.videos = [];
    this.isPlaylist = false;
  }

  protected eventShowOnlyVideo(): void {
    this.loadDefaultValues();
  }

  protected eventShowPlaylistVideo(): void {
    this.title = 'Content Playlist';
    this.subtitle = 'Presentation of the content of an external list video within the video tag';
    this.src = '';
    this.type = undefined;
    this.poster = '';

    this.videos.push({
      name: 'Video 1',
      description: 'Description video 1',
      poster: 'https://videocdn.cdnpk.net/videos/82e18cef-877a-4bb6-92f4-c0e4891a1941/horizontal/thumbnails/large.jpg',
      src: 'https://videocdn.cdnpk.net/videos/82e18cef-877a-4bb6-92f4-c0e4891a1941/horizontal/previews/videvo_watermarked/large.mp4',
      type: 'video/mp4'
    });
    this.videos.push({
      name: 'Video 2',
      description: 'Description video 2',
      poster: 'https://videocdn.cdnpk.net/videos/e3457efa-bdba-5ade-9764-6c4bf811ffe9/horizontal/thumbnails/large.jpg',
      src: 'https://videocdn.cdnpk.net/videos/e3457efa-bdba-5ade-9764-6c4bf811ffe9/horizontal/previews/videvo_watermarked/large.mp4',
      type: 'video/mp4'
    });
    this.videos.push({
      name: 'Video 3',
      description: 'Description video 3',
      poster: 'https://videocdn.cdnpk.net/videos/6227a07e-ba94-46ac-ae62-4368d626090c/horizontal/thumbnails/large.jpg',
      src: 'https://videocdn.cdnpk.net/videos/6227a07e-ba94-46ac-ae62-4368d626090c/horizontal/previews/clear/large.mp4?token=exp=1739029743~acl=/*~hmac=efd14c6b8dad77a9dc36e940971d61fecdad9299d899abe56bfef6bf70da88c2',
      type: 'video/mp4'
    });

    this.isPlaylist = true;
  }
}
