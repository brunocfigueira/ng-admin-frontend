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
import {MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgIf, NgStyle} from "@angular/common";
import {APP_CONST} from '../../../constants/app-constants';
import {EmbedAlignType, EmbedMediaType} from '../../types/embed-type';

@Component({
  selector: 'app-embed',
  imports: [
    MatCardModule,
    MatIcon,
    NgIf,
    NgStyle
  ],
  templateUrl: './embed.component.html',
  styleUrl: './embed.component.scss'
})
export class EmbedComponent implements OnInit, OnChanges, AfterViewInit {
  protected readonly appConst = APP_CONST;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() embedName: string = '';
  @Input() src!: string;
  @Input() type!: EmbedMediaType;
  @Input() width: string = '800px';
  @Input() height: string = '600px';
  @Input() allowFullscreen: boolean = true;
  @Input() pluginsPage: string = '';
  @Input() pluginUrl: string = '';
  @Input() hidden: boolean = false;
  @Input() align: EmbedAlignType = 'left';
  @Input() sandbox: string = '';
  @Input() seamless: boolean = false;
  @Input() displayHeader: boolean = true;
  @ViewChild('embedComponent') embedElement!: ElementRef<HTMLEmbedElement>;

  constructor(
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.validateAttributes();
  }

  ngAfterViewInit(): void {
    this.updateEmbedAttributes();
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log('changes', changes);
    this.updateEmbedAttributes();
  }

  private validateAttributes() {

    if (!this.src || !this.type) {
      throw new Error('"EmbedComponent" parameters [src] and [type] are mandatory. Set valid values for these properties.');
    }
  }

  private updateEmbedAttributes() {
    const embedElement = this.embedElement?.nativeElement;

    if (!embedElement) {
      console.warn('Embed has not yet been initialized.');
      return;
    }

    if (this.embedName) {
      this.renderer.setAttribute(embedElement, 'name', this.embedName);
    }

    if (this.src) {
      this.renderer.setAttribute(embedElement, 'src', this.src);
    }

    if (this.type) {
      this.renderer.setAttribute(embedElement, 'type', this.type);
    }

    if (this.seamless) {
      this.renderer.setAttribute(embedElement, 'seamless', '');
    } else {
      this.renderer.removeAttribute(embedElement, 'seamless');
    }

    if (this.allowFullscreen) {
      this.renderer.setAttribute(embedElement, 'allowfullscreen', '');
    } else {
      this.renderer.removeAttribute(embedElement, 'allowfullscreen');
    }

    if (this.sandbox) {
      this.renderer.setAttribute(embedElement, 'sandbox', this.sandbox);
    }
    if (this.pluginsPage) {
      this.renderer.setAttribute(embedElement, 'pluginspage', this.pluginsPage);
    }
    if (this.pluginUrl) {
      this.renderer.setAttribute(embedElement, 'pluginurl', this.pluginUrl);
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

  protected applyStyle(): object {
    return {
      width: this.width,
      height: this.height,
      display: this.hidden ? 'none' : 'block',
    };
  }

  protected eventLoadStart(event: any): void {
    console.log('eventLoadStart', event);
  }

  protected eventLoadedData(event: any): void {
    console.log('eventLoadedData', event);
  }
}
