import {Component} from '@angular/core';
import {DataTableComponent} from "../../../../shared-components/common/data-table/data-table.component";
import {DataTableColumnType} from '../../../../shared-components/types/data-table-type';
import moment from 'moment/moment';
import {CRUD_MESSAGES} from '../../../../constants/crud-messages';
import {OutputService} from '../../../../services/common/output.service';
import {LoadingService} from '../../../../services/common/loading.service';

@Component({
  selector: 'app-data-table-example',
  imports: [
    DataTableComponent
  ],
  templateUrl: './data-table-example.component.html',
  styleUrl: './data-table-example.component.css'
})
export class DataTableExampleComponent {
  protected dataColumns: DataTableColumnType[] = [
    {key: 'id', title: 'Id'},
    {key: 'name', title: 'Name'},
    {key: 'age', title: 'Age'},
    {key: 'groupName', title: 'Group Name'},
    {key: 'createdAt', title: 'Created At'},
    {key: 'updatedAt', title: 'Updated At'},
  ];
  protected itemDetailsColumns: DataTableColumnType[] = [
    {key: 'cell', title: 'Cell Phone'},
    {key: 'auto', title: 'Veículo'},
    {key: 'blonde', title: 'Type Blonde'},
    {key: 'color',
     title: 'Cor'},
  ];

  protected dataTable: any[] = this.generateDataTable(5);
  protected itemDetailsTable: any[] = [];

  constructor(private outputService: OutputService,
              private loadingService: LoadingService) {
  }

  protected generateDataTable(size: number): any[] {
    const groupNames = ['Administrator', 'Coordinator', 'Operation', 'Manager', 'Support'];
    const firstNames = ['John', 'Jane', 'Sam', 'Chris', 'Jordan', 'Pat', 'Morgan'];
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Clark', 'Williams', 'Lee'];
    const dataTable = [];

    const now = moment();

    for (let i = 1; i <= size; i++) {
      const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const randomGroupName = groupNames[Math.floor(Math.random() * groupNames.length)];
      const randomAge = Math.floor(Math.random() * (60 - 18 + 1)) + 18; // Idades entre 18 e 60

      dataTable.push({
        id: this.generateUniqueId(),
        name: `${randomFirstName} ${randomLastName}`,
        age: randomAge,
        groupName: randomGroupName,
        createdAt: now.format('DD/MM/YYYY HH:mm:ss'),
        updatedAt: ''
      });
    }

    return dataTable;
  }

  protected generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 5) + '-' + Date.now();
  }

  protected generateItemDetailsTable(size: number): any[] {
    const cell = ['+55 (31) 9589-9895', '+55 (52) 55864-9895', '+55 (64) 9589-2254', '+55 (17) 88989-22545', '+55 (19) 33656-2245'];
    const auto = ['Toyota', 'Tesla', 'Nissan', 'Honda', 'Ford', 'Fiat', 'Renault', 'RAM'];
    const blonde = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    const color = ['White', 'Black', 'Brown', 'Yellow'];
    const itemDetailsTable = [];

    for (let i = 1; i <= size; i++) {
      const randomCell = cell[Math.floor(Math.random() * cell.length)];
      const randomAuto = auto[Math.floor(Math.random() * auto.length)];
      const randomBlonde = blonde[Math.floor(Math.random() * blonde.length)];
      const randomColor = color[Math.floor(Math.random() * color.length)];

      itemDetailsTable.push({
        cell: randomCell,
        auto: randomAuto,
        blonde: randomBlonde,
        color: randomColor,
      });
    }

    return itemDetailsTable;
  }

  eventExportPdf(items: any[]): void {
    console.log('eventExportPdf', items);
  }

  eventExportCsv(items: any[]): void {
    console.log('eventExportCsv', items);
  }

  eventRefresh(): void {

    // simulation backend
    this.loadingService.show();
    setTimeout(() => {
      this.dataTable = this.generateDataTable(5);
      this.loadingService.hide();
    }, 2000);

  }

  eventCreateRecord(): void {
    const [newItem] = this.generateDataTable(1);
    this.dataTable.push(newItem);
    this.dataTable = [...this.dataTable];
    this.outputService.showShortMessageSuccess(CRUD_MESSAGES.CREATED_SUCCESS);
  }

  eventFilterRecords(term: string): void {
    console.log('Search Records:', term);
  }

  eventViewItemDetails = (item: any): void => {
    const totalItems = Math.floor(Math.random() * 9) + 1;
    this.itemDetailsTable = [...this.generateItemDetailsTable(totalItems)];
  }

  eventEditRecord = (item: any): void => {
    const now = moment();
    const index = this.dataTable.findIndex(obj => obj.id === item.id);
    item.updatedAt = now.format('DD/MM/YYYY HH:mm:ss');

    this.updateRecordDataTable(index, item);
    this.outputService.showShortMessageSuccess(CRUD_MESSAGES.UPDATED_SUCCESS);
  }

  private updateRecordDataTable(index: number, item: any): void {
    if (index !== -1) {
      this.dataTable[index] = {...this.dataTable[index], ...item};
    }
  }

  eventDeleteRecord = (item: any): void => {
    const index = this.dataTable.findIndex(obj => obj.id === item.id);
    this.deleteRecordDataTable(index);
    this.outputService.showShortMessageSuccess(CRUD_MESSAGES.DELETED_SUCCESS);
  }

  private deleteRecordDataTable(index: number): void {
    if (index !== -1) {
      this.dataTable.splice(index, 1);
    }
    this.dataTable = [...this.dataTable];
  }

  eventDeleteAllRecords = (items: any[]): void => {
    items.forEach(item => {
      const index = this.dataTable.findIndex(obj => obj.id === item.id);
      this.deleteRecordDataTable(index);
    });
    this.outputService.showShortMessageSuccess(CRUD_MESSAGES.DELETED_SUCCESS);
  }

  eventPageChange = (event: any): void => {
    console.log('PageChange Record:', event);
  }
}
