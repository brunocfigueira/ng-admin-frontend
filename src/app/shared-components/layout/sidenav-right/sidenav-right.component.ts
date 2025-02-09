import {Component} from '@angular/core';
import {MatListItem, MatNavList} from "@angular/material/list";
import {APP_CONST} from '../../../constants/app-constants';

@Component({
  selector: 'app-sidenav-right',
  imports: [
    MatListItem,
    MatNavList
  ],
  templateUrl: './sidenav-right.component.html',
  styleUrl: './sidenav-right.component.scss'
})
export class SidenavRightComponent {
  protected readonly appConst = APP_CONST;
}
