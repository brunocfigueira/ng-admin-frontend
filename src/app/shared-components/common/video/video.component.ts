import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {APP_CONST} from '../../../constants/app-constants';
import {
  ControlsListAttributeType,
  CrossOriginAttributeType,
  PreloadAttributeType,
  VideoAttributesSourcesType,
  VideoType
} from '../../types/video-type';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatListItem, MatListItemLine, MatListItemTitle, MatNavList} from '@angular/material/list';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-video',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    MatIconButton,
    MatListItem,
    MatListItemLine,
    MatListItemTitle,
    MatNavList,
    NgForOf,
    NgIf,
    NgStyle,
    MatTooltip
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent implements OnInit, OnChanges, AfterViewInit {
  protected readonly appConst = APP_CONST;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() videoName: string = '';
  @Input() isPlaylist: boolean = false;
  @Input() showPlaylist: boolean = true;
  @Input() namePlaylist: string = this.appConst.VIDEO.LABEL.TITLE_PLAYLIST;
  @Input() src: string = '';
  @Input() type: VideoType;
  @Input() videoPlaylist: VideoAttributesSourcesType[] = [];
  @Input() poster: string = '';
  @Input() width: string = '100%';
  @Input() height: string = 'auto';
  @Input() controls: boolean = true;
  @Input() autoplay: boolean = false;
  @Input() loop: boolean = false;
  @Input() muted: boolean = false;
  @Input() playsInline: boolean = false;
  @Input() disablePictureInPicture: boolean = false;
  @Input() preload: PreloadAttributeType = 'auto';
  @Input() controlsList: ControlsListAttributeType[] = [];
  @Input() crossOrigin: CrossOriginAttributeType = undefined;
  @Input() hidden: boolean = false;
  @Input() displayHeader: boolean = false;
  @ViewChild('videoComponent') videoElement!: ElementRef<HTMLVideoElement>;
  private readonly videoIndexDefault = 0;
  protected currentVideoIndex = this.videoIndexDefault;

  constructor(
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.validateAttributes();
  }

  ngAfterViewInit(): void {
    this.updateVideoAttributes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const src = changes['src'];
    const type = changes['type'];

    if (src) {
      this.src = src.currentValue;
    }
    if (type) {
      this.type = type.currentValue;
    }

    this.updateVideoAttributes();
  }

  private validateAttributes() {

    if (this.isPlaylist && this.videoPlaylist.length <= 0) {
      throw new Error('"VideoComponent" if the [isPlaylist]=true parameter is mandatory to define the [videoPlaylist] parameter with the video list.');
    }

    if (!this.isPlaylist && (!this.src || !this.type)) {
      throw new Error('"VideoComponent" when you do not define a list of videos to play, it is mandatory to define the [src] and [type] parameters');
    }
  }

  private resetCurrentVideoIndex() {
    this.currentVideoIndex = this.videoIndexDefault;
  }

  private loadCurrentVideo() {
    const videoElement = this.videoElement.nativeElement;
    videoElement.src = this.src;
    videoElement.load();
  }

  private loadCurrentVideoFromList() {
    this.resetCurrentVideoIndex();
    const videoElement = this.videoElement.nativeElement;
    const poster = this.videoPlaylist[this.currentVideoIndex].poster;
    if (poster) {
      this.renderer.setAttribute(videoElement, 'poster', poster);
    }
    videoElement.src = this.videoPlaylist[this.currentVideoIndex].src;
    videoElement.load();
  }

  private updateVideoAttributes() {
    const videoElement = this.videoElement?.nativeElement;

    if (!videoElement) {
      console.warn('Video has not yet been initialized.');
      return;
    }

    if (this.videoName) {
      this.renderer.setAttribute(videoElement, 'name', this.videoName);
    }

    if (this.preload) {
      this.renderer.setAttribute(videoElement, 'preload', this.preload);
    }

    if (this.poster) {
      this.renderer.setAttribute(videoElement, 'poster', this.poster);
    }

    if (this.controlsList.length > 0) {
      this.renderer.setAttribute(videoElement, 'controlsList', this.controlsList.join(' '));
    } else {
      this.renderer.removeAttribute(videoElement, 'controlsList');
    }

    if (this.crossOrigin) {
      this.renderer.setAttribute(videoElement, 'crossorigin', this.crossOrigin);
    }
    if (this.disablePictureInPicture) {
      this.renderer.setAttribute(videoElement, 'disablePictureInPicture', '');
    } else {
      this.renderer.removeAttribute(videoElement, 'disablePictureInPicture');
    }
    if (this.playsInline) {
      this.renderer.setAttribute(videoElement, 'playsinline', '');
    } else {
      this.renderer.removeAttribute(videoElement, 'playsinline');
    }
    if (this.controls) {
      this.renderer.setAttribute(videoElement, 'controls', '');
    } else {
      this.renderer.removeAttribute(videoElement, 'controls');
    }
    if (this.autoplay) {
      this.renderer.setAttribute(videoElement, 'autoplay', '');
    } else {
      this.renderer.removeAttribute(videoElement, 'autoplay');
    }
    if (this.loop) {
      this.renderer.setAttribute(videoElement, 'loop', '');
    } else {
      this.renderer.removeAttribute(videoElement, 'loop');
    }
    if (this.muted) {
      this.renderer.setAttribute(videoElement, 'muted', '');
    } else {
      this.renderer.removeAttribute(videoElement, 'muted');
    }

    if (!this.isPlaylist) {
      this.loadCurrentVideo();
    } else {
      this.loadCurrentVideoFromList();
    }
  }

  protected showHeader(): boolean {
    return this.title.length > 0 || this.subtitle.length > 0;
  }

  protected showTitle(): boolean {
    return this.title.length > 0;
  }

  protected showSubtitle(): boolean {
    return this.subtitle.length > 0;
  }

  protected displayNamePlayList(): string {
    return this.namePlaylist ? this.namePlaylist : this.appConst.AUDIO.LABEL.TITLE_PLAYLIST;
  }

  protected applyVideoStyle(): object {
    return {
      width: this.width,
      height: this.height,
      display: this.hidden ? 'none' : 'block'
    };
  }

  protected applyPlaylistStyle(): object {
    return {
      width: this.width
    };
  }

  protected playNow(videoIndex: number): void {
    this.currentVideoIndex = videoIndex;
    this.loadAndPlayCurrentVideoFromList();
  }

  protected playNext(): void {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videoPlaylist.length;
    this.loadAndPlayCurrentVideoFromList();
  }

  protected playPrevious(): void {
    this.currentVideoIndex = (this.currentVideoIndex - 1 + this.videoPlaylist.length) % this.videoPlaylist.length;
    this.loadAndPlayCurrentVideoFromList();
  }

  protected loadAndPlayCurrentVideoFromList(): void {
    const videoElement = this.videoElement.nativeElement;
    const poster = this.videoPlaylist[this.currentVideoIndex].poster;
    if (poster) {
      this.renderer.setAttribute(videoElement, 'poster', poster);
    }
    videoElement.src = this.videoPlaylist[this.currentVideoIndex].src;
    videoElement.load();
    videoElement.play();
  }
}
