import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {
  MatSidenav,
  MatSidenavContent,
  MatSidenavModule
} from '@angular/material/sidenav';
import {MatListModule, MatNavList} from '@angular/material/list';
import {SidenavLeftComponent} from '../sidenav-left/sidenav-left.component';
import {APP_CONST} from '../../../constants/app-constants';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {RouteDataService} from '../../../services/common/route-data.service';
import {NgClass} from '@angular/common';
import {SidenavRightComponent} from '../sidenav-right/sidenav-right.component';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatToolbarModule,
    MatSidenav,
    MatNavList,
    MatSidenavContent,
    MatCardModule,
    SidenavLeftComponent,
    NgClass, SidenavRightComponent, MatIconButton,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  protected readonly appConst = APP_CONST;
  @ViewChild('sidenavRight') sidenavRight!: MatSidenav;
  protected mainTitle = '';
  protected mainSubtitle = '';
  protected layoutClass = '';

  constructor(private routeDataService: RouteDataService) {
  }

  ngOnInit() {
    this.routeDataService.title$.subscribe((title) => (this.mainTitle = title));
    this.routeDataService.subtitle$.subscribe((subtitle) => (this.mainSubtitle = subtitle));
    this.routeDataService.layout$.subscribe((layout) => (this.layoutClass = layout));
  }

  protected adjustLayout(): string {
    return this.layoutClass === 'compacted' ? 'p-16 main-background' : 'main-background';
  }

  protected closeSidenavRight(): void {
    if (this.sidenavRight) {
      this.sidenavRight.toggle();
    }
  }
}
