import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {APP_CONST} from '../../../constants/app-constants';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-form-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.css'
})
export class FormCardComponent implements OnInit {
  protected readonly appConst = APP_CONST
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() alignActionButtons: 'start' | 'end' = 'start';
  @Input() formContentTemplate!: TemplateRef<any>;
  @Input() actionButtonsTemplate?: TemplateRef<any>;

  ngOnInit() {
    this.validateTemplates();
  }

  private validateTemplates(): void {
    if (!this.formContentTemplate) {
      throw new Error('To use the "FormCardComponent" it is necessary to define the "formContentTemplate" parameter in the parent component');
    }
  }

  protected showHeader(): boolean {
    return !!this.title || !!this.subtitle;
  }

  protected showTitle(): boolean {
    return !!this.title;
  }

  protected showSubtitle(): boolean {
    return !!this.subtitle;
  }
}
