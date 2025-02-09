import {Component, OnInit} from '@angular/core';
import {IframeComponent} from '../../../../shared-components/common/iframe/iframe.component';
import {ActionButtonComponent} from '../../../../shared-components/common/action-button/action-button.component';

@Component({
  selector: 'app-iframe-example',
  imports: [
    IframeComponent,
    ActionButtonComponent
  ],
  templateUrl: './iframe-example.component.html',
  styleUrl: './iframe-example.component.scss'
})
export class IframeExampleComponent implements OnInit {

  protected title: string = '';
  protected subtitle: string = '';
  protected src: string = '';
  protected srcdoc: string = '';
  protected allow: string = '';

  ngOnInit() {
    this.loadDefaultValues();
  }

  private loadDefaultValues(): void {
    this.title = 'Content Page';
    this.subtitle = 'Presentation of content from an external page within an iframe';
    this.src = 'https://en.wikipedia.org/wiki/Avocado';
    this.srcdoc = '';
    this.allow = '';

  }

  protected eventShowIframeWithHtml(): void {
    this.title = 'Content HTML';
    this.subtitle = 'Presentation of HTML content within an iframe';
    this.src = ''
    this.srcdoc = this.generateStyledText();
    this.allow = ''
  }

  protected eventShowIframeWithJson(): void {
    this.title = 'Content JSON';
    this.subtitle = 'Presentation of JSON content within an iframe';
    this.src = 'https://viacep.com.br/ws/01001000/json/'
    this.srcdoc = '';
    this.allow = ''
  }
  protected eventShowIframeWithXml(): void {
    this.title = 'Content XML';
    this.subtitle = 'Presentation of XML content within an iframe';
    this.src = 'https://www.oasis-open.org/committees/xml-conformance/suite-v1se/xmltest/xmltest.xml'
    this.srcdoc = '';
    this.allow = ''
  }

  protected eventShowIframeWithDocPdf(): void {
    this.title = 'Content Document PDF';
    this.subtitle = 'Presentation of PDF content within an iframe';
    this.src = 'https://s3.sa-east-1.amazonaws.com/livro.fullcycle.com.br/Livro_FullCycle-12.pdf';
    this.srcdoc = '';
    this.allow = '';
  }

  protected eventShowIframeWithEmbedVideo(): void {
    this.title = 'Content Document Embed Video';
    this.subtitle = 'Presentation of Video content within an iframe';
    this.src = 'https://www.youtube.com/embed/aRXqzrqnXD8';
    this.srcdoc = '';
    this.allow = 'autoplay';
  }

  protected eventShowIframeWithUrl(): void {
    this.loadDefaultValues();
  }

  private generateStyledText(): string {
    const colors = ['red', 'blue', 'green', 'orange', 'purple'];
    const fonts = ['Arial', 'Verdana', 'Georgia', 'Tahoma', 'Courier New'];
    const sizes = ['14px', '16px', '18px', '20px', '22px'];

    // Texto padrão para cada linha
    const loremIpsum =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    let htmlContent = '';

    for (let i = 1; i <= 600; i++) {
      // Gera valores aleatórios
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

      // Adiciona um parágrafo estilizado ao HTML
      htmlContent += `
      <p style="color: ${randomColor}; font-family: ${randomFont}; font-size: ${randomSize}; margin: 5px 0;">
        ${i}. ${loremIpsum}
      </p>
    `;
    }

    return htmlContent;
  }
}
