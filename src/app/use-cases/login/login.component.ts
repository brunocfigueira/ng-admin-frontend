import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterModule} from '@angular/router';
import {RouteDataService} from '../../services/common/route-data.service';
import {APP_CONST} from '../../constants/app-constants';
import {OutputService} from '../../services/common/output.service';
import {NgIf} from '@angular/common';
import {CRUD_MESSAGES} from '../../constants/crud-messages';
import {LoadingService} from '../../services/common/loading.service';
import {ActionButtonComponent} from "../../shared-components/common/action-button/action-button.component";
import {FormCardComponent} from "../../shared-components/common/form-card/form-card.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ActionButtonComponent,
    NgIf,
    FormCardComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('formLoginRef', {static: true}) formLoginRef!: TemplateRef<any>;
  @ViewChild('actionButtonRef', {static: true}) actionButtonRef!: TemplateRef<any>;

  protected readonly appConst = APP_CONST;
  protected loginForm: FormGroup;
  protected emailControl: FormControl;
  protected passwordControl: FormControl;
  protected formTitle = '';
  protected formSubtitle = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private outputService: OutputService,
    private loadingService: LoadingService,
    private routeDataService: RouteDataService
  ) {
    // Inicializando os controles com mensagens de erro embutidas
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.passwordControl = new FormControl('', [Validators.required]);

    this.loginForm = this.fb.group({
      email: this.emailControl,
      password: this.passwordControl
    });

    this.routeDataService.title$.subscribe((title) => (this.formTitle = title));
    this.routeDataService.subtitle$.subscribe((subtitle) => (this.formSubtitle = subtitle));
  }

  protected onSubmit() {
    if (this.loginForm.valid) {
      this.simulateBackendCall();
    } else {
      this.outputService.showShortMessageError('The form contains errors. Check the fields.');
    }
  }

  /**
   * Retorna a mensagem de erro associada ao FormControl.
   */
  protected getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is mandatory';
    }
    if (control.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }

  protected forgotPassword(): void {
    this.simulateBackendCall();
  }

  private simulateBackendCall() {
    this.loadingService.show();
    setTimeout(() => {
      this.redirectToMain();
      this.loadingService.hide();
    }, 5000);
  }

  private redirectToMain() {
    this.router.navigateByUrl(this.appConst.ENTRY_ROUTE);
  }
}
