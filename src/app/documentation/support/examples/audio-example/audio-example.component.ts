import {Component, OnInit} from '@angular/core';
import {ActionButtonComponent} from "../../../../shared-components/common/action-button/action-button.component";
import {AudioComponent} from '../../../../shared-components/common/audio/audio.component';
import {AudioAttributesSourcesType, AudioType} from '../../../../shared-components/types/audio-type';

@Component({
  selector: 'app-audio-example',
  imports: [
    ActionButtonComponent,
    AudioComponent
  ],
  templateUrl: './audio-example.component.html',
  styleUrl: './audio-example.component.scss'
})
export class AudioExampleComponent implements OnInit {
  protected title: string = '';
  protected subtitle: string = '';
  protected src: string = '';
  protected audios: AudioAttributesSourcesType[] = []
  protected type: AudioType = 'audio/mpeg';
  protected isPlaylist = false;

  ngOnInit() {
    this.loadDefaultValues();
  }

  private loadDefaultValues(): void {
    this.title = 'Content Only Play';
    this.subtitle = 'Presentation of the content of an external song within the audio tag';
    this.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    this.type = 'audio/mpeg';
    this.audios = [];
    this.isPlaylist = false;
  }

  protected eventShowOnlyPlay(): void {
    this.loadDefaultValues();
  }

  protected eventShowPlaylist(): void {
    this.title = 'Content Playlist';
    this.subtitle = 'Presentation of the content of an external list song within the audio tag';
    this.src = '';
    this.type = undefined;

    this.audios.push({
      name: 'Audio 1',
      description: 'Description audio 1',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      type: 'audio/mpeg'
    });
    this.audios.push({
      name: 'Audio 2',
      description: 'Description audio 2',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      type: 'audio/mpeg'
    });
    this.audios.push({
      name: 'Audio 3',
      description: 'Description audio 3',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      type: 'audio/mpeg'
    });

    this.isPlaylist = true;
  }
}
