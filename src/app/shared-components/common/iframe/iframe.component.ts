import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {NgIf, NgStyle} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {APP_CONST} from '../../../constants/app-constants';

@Component({
  selector: 'app-iframe',
  imports: [
    NgStyle,
    MatCardModule,
    NgIf,
    MatIcon,
  ],
  templateUrl: './iframe.component.html',
  styleUrl: './iframe.component.scss'
})
export class IframeComponent implements OnInit, OnChanges, AfterViewInit {
  protected readonly appConst = APP_CONST;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() iframeName: string = '';
  @Input() src: string = '';
  @Input() srcdoc: string = '';
  @Input() width: string = '800px';
  @Input() height: string = '600px';
  @Input() loading: 'lazy' | 'eager' = 'eager';
  @Input() scrolling: 'yes' | 'no' | 'auto' = 'auto';
  @Input() allowFullscreen: boolean = true;
  @Input() csp: string = '';
  @Input() referrerPolicy: string = '';
  @Input() allow: string = '';
  @Input() sandbox: string = '';
  @Input() displayHeader: boolean = true;

  @ViewChild('iframeComponent') iframeElement!: ElementRef<HTMLIFrameElement>;


  constructor(
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.validateAttributes();
  }

  ngAfterViewInit(): void {
    this.setIframeAttributes();
  }

  ngOnChanges(): void {
    if (this.iframeElement) {
      this.setIframeAttributes();
    }
  }

  private validateAttributes() {
    if (this.src.length > 0 && this.srcdoc.length > 0) {
      throw new Error('"IframeComponent" allows only one content loading source. Choose just one [src] or [srcdoc].');
    }
  }

  private setIframeAttributes() {
    const iframe = this.iframeElement?.nativeElement;

    if (!iframe) {
      console.warn('Iframe has not yet been initialized.');
      return;
    }

    if (this.iframeName) {
      this.renderer.setAttribute(iframe, 'name', this.iframeName);
    }

    if (this.src) {
      this.renderer.setAttribute(iframe, 'src', this.src);
      this.renderer.removeAttribute(iframe, 'srcdoc');
    }
    if (this.srcdoc) {
      this.renderer.setAttribute(iframe, 'srcdoc', this.srcdoc);
      this.renderer.removeAttribute(iframe, 'src');
    }

    if (this.allowFullscreen) {
      this.renderer.setAttribute(iframe, 'allowfullscreen', '');
    } else {
      this.renderer.removeAttribute(iframe, 'allowfullscreen');
    }

    if (this.referrerPolicy) {
      this.renderer.setAttribute(iframe, 'referrerpolicy', this.referrerPolicy);
    }

    if (this.allow) {
      this.renderer.setAttribute(iframe, 'allow', this.allow);
    }

    if (this.sandbox) {
      this.renderer.setAttribute(iframe, 'sandbox', this.sandbox);
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
    };
  }
}
