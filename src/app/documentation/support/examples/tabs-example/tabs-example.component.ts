import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

import {DataTableComponent} from '../../../../shared-components/common/data-table/data-table.component';
import {DataTableColumnType} from '../../../../shared-components/types/data-table-type';
import moment from 'moment';
import {TabsComponent} from '../../../../shared-components/common/tabs/tabs.component';
import {ClosedTabType, TabType} from '../../../../shared-components/types/tabs-type';
import {APP_CONST} from '../../../../constants/app-constants';
import {OutputService} from '../../../../services/common/output.service';
import {CRUD_MESSAGES} from '../../../../constants/crud-messages';
import {MatCardModule} from '@angular/material/card';
import {JsonPipe} from '@angular/common';
import {ActionButtonComponent} from "../../../../shared-components/common/action-button/action-button.component";
import {FormCardComponent} from "../../../../shared-components/common/form-card/form-card.component";

@Component({
  selector: 'app-tabs-example',
  imports: [
    DataTableComponent,
    TabsComponent,
    MatCardModule,
    JsonPipe,
    ActionButtonComponent,
    FormCardComponent
  ],
  templateUrl: './tabs-example.component.html',
  styleUrl: './tabs-example.component.css'
})
export class TabsExampleComponent implements OnInit {
  @ViewChild('tabsRef') tabsComponent!: TabsComponent;
  @ViewChild('dataTableRecordsRef', {static: true}) dataTableRecordsRef!: TemplateRef<any>;
  @ViewChild('createItemRef', {static: true}) createItemRef!: TemplateRef<any>;
  @ViewChild('updateItemRef', {static: true}) updateItemRef!: TemplateRef<any>;

  @ViewChild('firstTabRef', {static: true}) firstTabRef!: TemplateRef<any>;
  @ViewChild('secondTabRef', {static: true}) secondTabRef!: TemplateRef<any>;
  @ViewChild('thirdTabRef', {static: true}) thirdTabRef!: TemplateRef<any>;

  protected advancedTabs: TabType[] = [];
  protected simpleTabs: TabType[] = [];
  protected currentTabIndex = 0;
  protected appConst = APP_CONST;

  protected dataColumns: DataTableColumnType[] = [
    {key: 'id', title: 'Id'},
    {key: 'name', title: 'Name'},
    {key: 'age', title: 'Age'},
    {key: 'groupName', title: 'Group Name'},
    {key: 'createdAt', title: 'Created At'},
    {key: 'updatedAt', title: 'Updated At'},
  ];
  protected dataTable: any[] = [];
  protected objectEditItem: any;

  constructor(private outputService: OutputService) {
  }

  ngOnInit() {
    this.createSimpleTabs();

    this.createAdvancedTab({
      name: 'Table Items',
      templateContentRef: this.dataTableRecordsRef,
      allowClose: false
    });
    this.updateCurrentTabIndex();
    this.dataTable = this.randomDataTable(5);
  }

  private createSimpleTabs(): void {
    this.simpleTabs = [
      {
        name: 'First Tab',
        templateContentRef: this.firstTabRef,
        allowClose: false
      },
      {
        name: 'Second Tab',
        templateContentRef: this.secondTabRef,
        allowClose: false
      },
      {
        name: 'Third Tab',
        templateContentRef: this.thirdTabRef,
        allowClose: false
      },
    ];
  }

  private indexDefinition(): number {
    return this.advancedTabs.length - 1
  }

  private updateCurrentTabIndex() {
    this.currentTabIndex = this.indexDefinition();
  }

  private createAdvancedTab(tab: TabType): void {
    this.advancedTabs.push(tab);
    this.updateCurrentTabIndex();
  }

  protected eventCloseTab(event: ClosedTabType): void {
    this.removeTabItem(event.tabIndexDeleted)
    this.currentTabIndex = event.tabIndexUpdated;
  }

  private removeTabItem(index: number): void {
    this.advancedTabs.splice(index, 1);
  }

  protected randomDataTable(size: number): any[] {
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

  protected eventNewItem(): void {
    this.createAdvancedTab({
      name: 'New Item Registration',
      templateContentRef: this.createItemRef,
      allowClose: true
    });
  }

  protected eventTabIndexChange(index: number): void {
    this.currentTabIndex = index;
  }

  protected createNewRecord(event: MouseEvent): void {

    const [newItem] = this.randomDataTable(1);
    newItem.id = 'new - '.concat(newItem.id);
    this.dataTable.push(newItem);
    this.dataTable = [...this.dataTable];
    this.outputService.showShortMessageSuccess(CRUD_MESSAGES.CREATED_SUCCESS);

    this.tabsComponent.closeTab(this.currentTabIndex);
  }

  eventEditRecord = (item: any): void => {
    this.createAdvancedTab({
      name: 'Edit Item Registration',
      templateContentRef: this.updateItemRef,
      allowClose: true
    });
    this.objectEditItem = item;
  }

  protected updateRecord(item: any): void {
    const now = moment();
    const index = this.dataTable.findIndex(obj => obj.id === item.id);
    item.id = 'updated - '.concat(item.id);
    item.updatedAt = now.format('DD/MM/YYYY HH:mm:ss');
    this.updateRecordDataTable(index, item);
    this.outputService.showShortMessageSuccess(CRUD_MESSAGES.UPDATED_SUCCESS);
    this.tabsComponent.closeTab(this.currentTabIndex);
  }

  private updateRecordDataTable(index: number, item: any): void {
    if (index !== -1) {
      this.dataTable[index] = {...this.dataTable[index], ...item};
    }
  }
}
