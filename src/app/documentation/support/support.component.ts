import {Component} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {
  SnackbarExampleComponent,
} from './examples/snackbar-example/snackbar-exemple.component';
import {WaitingProcessExampleComponent} from './examples/waiting-process-example/waiting-process-example.component';
import {DataRoutesExampleComponent} from './examples/data-routes-example/data-routes-example.component';
import {BoxDialogExampleComponent} from './examples/box-dialog-example/box-dialog-example.component';
import {DataBrowserExampleComponent} from './examples/data-browser-example/data-browser-example.component';
import {DataTableExampleComponent} from './examples/data-table-example/data-table-example.component';
import {TabsExampleComponent} from './examples/tabs-example/tabs-example.component';
import {FormCardExampleComponent} from './examples/form-card-example/form-card-example.component';
import {ActionButtonExampleComponent} from './examples/action-button-example/action-button-example.component';
import {LocalStorageExampleComponent} from './examples/local-storage-example/local-storage-example.component';
import {BottomSheetExampleComponent} from './examples/bottom-sheet-example/bottom-sheet-example.component';
import {IframeExampleComponent} from './examples/iframe-example/iframe-example.component';
import {AudioExampleComponent} from './examples/audio-example/audio-example.component';
import {VideoExampleComponent} from './examples/video-example/video-example.component';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    MatExpansionModule,
    DataTableExampleComponent,
    TabsExampleComponent,
    FormCardExampleComponent,
    ActionButtonExampleComponent,
    LocalStorageExampleComponent,
    BottomSheetExampleComponent,
    IframeExampleComponent,
    AudioExampleComponent,
    VideoExampleComponent,
    DataRoutesExampleComponent,
    DataBrowserExampleComponent,
    SnackbarExampleComponent,
    WaitingProcessExampleComponent,
    BoxDialogExampleComponent
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {

}
