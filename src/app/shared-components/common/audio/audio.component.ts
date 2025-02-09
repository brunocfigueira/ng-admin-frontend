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
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {APP_CONST} from '../../../constants/app-constants';
import {
  AudioType,
  AudioAttributesSourcesType,
  PreloadAttributeType,
  CrossOriginAttributeType
} from '../../types/audio-type';
import {MatTooltip} from '@angular/material/tooltip';
import {MatListItem, MatListItemLine, MatListItemTitle, MatNavList} from '@angular/material/list';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-audio',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    NgIf,
    NgStyle,
    MatTooltip,
    MatNavList,
    MatListItem,
    NgForOf,
    MatIconButton,
    MatListItemTitle,
    MatListItemLine
  ],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss'
})
export class AudioComponent implements OnInit, OnChanges, AfterViewInit {
  protected readonly appConst = APP_CONST;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() audioName: string = '';
  @Input() isPlaylist: boolean = false;
  @Input() showPlaylist: boolean = true;
  @Input() namePlaylist: string = this.appConst.AUDIO.LABEL.TITLE_PLAYLIST;
  @Input() src: string = '';
  @Input() type: AudioType;
  @Input() audioPlaylist: AudioAttributesSourcesType[] = [];
  @Input() width: string = '300px';
  @Input() height: string = '65px';
  @Input() controls: boolean = true;
  @Input() autoplay: boolean = false;
  @Input() loop: boolean = false;
  @Input() muted: boolean = false;
  @Input() preload: PreloadAttributeType = 'auto';
  @Input() crossOrigin: CrossOriginAttributeType = undefined;
  @Input() hidden: boolean = false;
  @Input() displayHeader: boolean = false;
  @ViewChild('audioComponent') audioElement!: ElementRef<HTMLAudioElement>;
  private readonly audioIndexDefault = 0;
  protected currentAudioIndex = this.audioIndexDefault;

  constructor(
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.validateAttributes();
  }

  ngAfterViewInit(): void {
    this.updateAudioAttributes();
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

    this.updateAudioAttributes();
  }

  private validateAttributes() {

    if (this.isPlaylist && this.audioPlaylist.length <= 0) {
      throw new Error('"AudioComponent" if the [isPlaylist]=true parameter is mandatory to define the [audioPlaylist] parameter with the audio list.');
    }

    if (!this.isPlaylist && (!this.src || !this.type)) {
      throw new Error('"AudioComponent" when you do not define a list of audios to play, it is mandatory to define the [src] and [type] parameters');
    }
  }

  private resetCurrentAudioIndex() {
    this.currentAudioIndex = this.audioIndexDefault;
  }

  private loadCurrentAudio() {
    const audioElement = this.audioElement.nativeElement;
    audioElement.src = this.src;
    audioElement.load();
  }

  private loadCurrentAudioFromList() {
    this.resetCurrentAudioIndex();
    const audioElement = this.audioElement.nativeElement;
    audioElement.src = this.audioPlaylist[this.currentAudioIndex].src;
    audioElement.load();
  }

  private updateAudioAttributes() {
    const audioElement = this.audioElement?.nativeElement;

    if (!audioElement) {
      console.warn('Audio has not yet been initialized.');
      return;
    }

    if (this.audioName) {
      this.renderer.setAttribute(audioElement, 'name', this.audioName);
    }

    if (this.preload) {
      this.renderer.setAttribute(audioElement, 'preload', this.preload);
    }
    if (this.crossOrigin) {
      this.renderer.setAttribute(audioElement, 'crossorigin', this.crossOrigin);
    }
    if (this.controls) {
      this.renderer.setAttribute(audioElement, 'controls', '');
    } else {
      this.renderer.removeAttribute(audioElement, 'controls');
    }
    if (this.autoplay) {
      this.renderer.setAttribute(audioElement, 'autoplay', '');
    } else {
      this.renderer.removeAttribute(audioElement, 'autoplay');
    }
    if (this.loop) {
      this.renderer.setAttribute(audioElement, 'loop', '');
    } else {
      this.renderer.removeAttribute(audioElement, 'loop');
    }
    if (this.muted) {
      this.renderer.setAttribute(audioElement, 'muted', '');
    } else {
      this.renderer.removeAttribute(audioElement, 'muted');
    }

    if (!this.isPlaylist) {
      this.loadCurrentAudio();
    } else {
      this.loadCurrentAudioFromList();
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

  protected applyAudioStyle(): object {
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

  protected playNow(audioIndex: number): void {
    this.currentAudioIndex = audioIndex;
    this.loadAndPlayCurrentAudioFromList();
  }

  protected playNext(): void {
    this.currentAudioIndex = (this.currentAudioIndex + 1) % this.audioPlaylist.length;
    this.loadAndPlayCurrentAudioFromList();
  }

  protected playPrevious(): void {
    this.currentAudioIndex = (this.currentAudioIndex - 1 + this.audioPlaylist.length) % this.audioPlaylist.length;
    this.loadAndPlayCurrentAudioFromList();
  }

  protected loadAndPlayCurrentAudioFromList(): void {
    const audioElement = this.audioElement.nativeElement;
    audioElement.src = this.audioPlaylist[this.currentAudioIndex].src;
    audioElement.load();
    audioElement.play();
  }
}
