import {Component} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {RouteDataService} from '../../../../services/common/route-data.service';
import {ActionButtonComponent} from "../../../../shared-components/common/action-button/action-button.component";

@Component({
  selector: 'app-data-routes-example',
  imports: [
    JsonPipe,
    ActionButtonComponent
  ],
  templateUrl: './data-routes-example.component.html',
  styleUrl: './data-routes-example.component.css'
})
export class DataRoutesExampleComponent {
  protected routeDataValue: any;

  constructor(private routeDataService: RouteDataService) {
  }

  onClickButtonRoutes(value: number): void {
    switch (value) {
      case 1:
        this.routeDataService.title$.subscribe((value) => (this.routeDataValue = value));
        break;
      case 2:
        this.routeDataService.subtitle$.subscribe((value) => (this.routeDataValue = value));
        break;
      case 3:
        this.routeDataService.layout$.subscribe((value) => (this.routeDataValue = value));
        break;
      case 4:
        this.routeDataService.data$.subscribe((value) => (this.routeDataValue = value));
        break;
      case 5:
        this.routeDataValue = this.routeDataService.getValue('dynamicValue');
        break;
      default:
        break;
    }
  }
}
