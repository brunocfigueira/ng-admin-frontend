import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormCardComponent} from '../../../../shared-components/common/form-card/form-card.component';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ActionButtonComponent} from '../../../../shared-components/common/action-button/action-button.component';
import {OutputService} from '../../../../services/common/output.service';

@Component({
  selector: 'app-form-card-example',
  imports: [
    FormCardComponent,
    MatFormField,
    MatInput,
    MatLabel,
    ActionButtonComponent
  ],
  templateUrl: './form-card-example.component.html',
  styleUrl: './form-card-example.component.css'
})
export class FormCardExampleComponent {
  @ViewChild('formContentRef', {static: true}) formContentRef!: TemplateRef<any>;
  @ViewChild('actionButtonsRef', {static: true}) actionButtonsRef!: TemplateRef<any>;

  protected formTitle = 'Title of Form';
  protected formSubtitle = 'A brief description of the form';

  constructor(private outputService: OutputService) {
  }
  protected eventClickButton(event: MouseEvent) {
    this.outputService.showShortMessageDefault("Save button click event");
  }
}
