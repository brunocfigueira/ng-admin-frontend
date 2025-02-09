import {Component} from '@angular/core';
import {LoadingService} from '../../../../services/common/loading.service';
import {ActionButtonComponent} from "../../../../shared-components/common/action-button/action-button.component";

@Component({
  selector: 'app-waiting-process-example',
  imports: [
    ActionButtonComponent
  ],
  templateUrl: './waiting-process-example.component.html',
  styleUrl: './waiting-process-example.component.css'
})
export class WaitingProcessExampleComponent {
  constructor(private loadingService: LoadingService) {
  }

  onClickButtonLoading(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 5000);
  }
}
