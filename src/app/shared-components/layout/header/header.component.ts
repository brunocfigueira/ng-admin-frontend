import {Component, Input} from '@angular/core';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {APP_CONST} from '../../../constants/app-constants';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenav} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {Router, RouterModule} from '@angular/router';
import {LoadingService} from '../../../services/common/loading.service';
import {BottomSheetService} from '../../../services/common/bottom-sheet.service';
import {BottomSheetNotifyComponent} from '../../common/bottom-sheet-notify/bottom-sheet-notify.component';
import {PushNotificationType} from '../../types/push-notification-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,
    MatToolbar,
    MatIconModule,
    RouterModule,
    MatIcon,
    MatBadgeModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected readonly appConst = APP_CONST
  @Input() sidenavLeft!: MatSidenav;
  @Input() sidenavRight!: MatSidenav;

  constructor(private loadingService: LoadingService,
              private bottomSheetService: BottomSheetService,
              private router: Router) {
  }

  protected toggleSidenavLeft(): void {
    this.sidenavLeft.toggle();
  }
  protected toggleSidenavRight(): void {
    this.sidenavRight.toggle();
  }

  protected openNotifications(): void {
    const notifications: PushNotificationType[] = [
      {
       text:'Processing of purchasing report #996-001 is ready. Click this link to download the file.'
      },
      {
        text:'Order #125998 was completed successfully',
      },
      {
        text:'An error occurred in operation #003-998. Contact the call center 0800-998-223',
      },
    ];
    this.bottomSheetService.open(BottomSheetNotifyComponent,notifications)
  }

  protected eventExit(): void {
    // aqui deve chamar um seviço de authenticacao
    // para realizar a saida do usuario e aplicar as regras de limpeza de dados

    // simulation backend
    this.loadingService.show();
    setTimeout(() => {
     // window.location.href = this.appConst.EXIT_ROUTE;
      this.router.navigateByUrl(this.appConst.EXIT_ROUTE);
      this.loadingService.hide();
    }, 5000);
  }
}
