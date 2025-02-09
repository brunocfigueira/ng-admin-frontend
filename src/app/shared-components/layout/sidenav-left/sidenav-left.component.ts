import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule} from '@angular/router';
import {MatListItem, MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {APP_CONST} from '../../../constants/app-constants';
import {NgFor} from '@angular/common';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

@Component({
  selector: 'app-sidenav-left',
  standalone: true,
  imports: [MatIconModule,
    NgFor,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatListItem,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
  ],
  templateUrl: './sidenav-left.component.html',
  styleUrl: './sidenav-left.component.css'
})
export class SidenavLeftComponent {
  protected readonly appConst = APP_CONST;
  protected arrayMenus = [
    {
      groupName: 'Pages',
      expanded: true,
      items: [
        {label: 'About', link: '/about'},
        {label: 'Support Technical', link: '/support'},
      ]
    }
  ];
}
