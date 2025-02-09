import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {APP_CONST} from '../../../constants/app-constants';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  protected readonly appConst = APP_CONST;
}
