import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {NgForOf, NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltip} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CustomPaginatorIntl} from '../../intl/custom-paginator-intl';
import {MatSort} from '@angular/material/sort';
import {Data} from '@angular/router';
import {BoxDialogService} from '../../../services/common/box-dialog.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {APP_CONST} from '../../../constants/app-constants';
import {CRUD_MESSAGES} from '../../../constants/crud-messages';
import {DataTableValidation} from '../../validations/data-table-validation';
import {DataFilterUtil} from '../../../utils/data-filter-util';
import {DataTableColumnType, EventValidationType} from '../../types/data-table-type';
import {DialogActionButtonsType} from '../../types/dialog-type';
import {ItemDetailsTableComponent} from './item-details-table/item-details-table.component';
import {MatMenu, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconButton,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltip,
    ItemDetailsTableComponent,
    MatMenuTrigger,
    MatMenuModule,
    MatDivider
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: CustomPaginatorIntl},
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
  animations: [
    trigger('expansion-effect', [
      state('hide', style({opacity: 0, display: 'none'})),
      state('show', style({opacity: 1, display: 'contents'})),
    ]),
    trigger('fade-effect', [
      state('fadeOut', style({
        opacity: 0,
        display: 'none'
      })),
      state('fadeIn', style({
        opacity: 1,
        display: 'block'
      })),
      transition('fadeIn <=> fadeOut', animate('800ms ease-in-out')),
    ]),
  ],
})
export class DataTableComponent implements OnInit, OnChanges {
  protected readonly appConst = APP_CONST;
  protected readonly messages = CRUD_MESSAGES;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() showPagination: boolean = false;
  @Input() showPaginationItemDetails: boolean = false;
  @Input() showActionExportPdf: boolean = false;
  @Input() showActionExportCsv: boolean = false;
  @Input() showActionRefresh: boolean = false;
  @Input() showActionDetails: boolean = false;
  @Input() showActionEdit: boolean = false;
  @Input() showActionDelete: boolean = false;
  @Input() showActionDeleteAll: boolean = false;
  @Input() showActionCreate: boolean = false;
  @Input() showInputFilter: boolean = false;
  @Input() showInputSearchItemDetails: boolean = false;
  @Input() isHttpRequest: boolean = false;
  @Input() maxHeight: number = 250;
  @Input() maxHeightItemDetails: number = 250;
  @Input() dataColumns: DataTableColumnType[] = [];
  @Input() itemDetailsColumns: DataTableColumnType[] = [];
  @Input() dataTable: any[] = [];
  @Input() itemDetailsTable: any[] = [];

  @Output() onViewItemDetails = new EventEmitter<any>();
  @Output() onExportPdf = new EventEmitter<any[]>();
  @Output() onExportCsv = new EventEmitter<any[]>();
  @Output() onRefresh = new EventEmitter<void>();
  @Output() onCreate = new EventEmitter<void>();
  @Output() onFilter = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onDeleteAll = new EventEmitter<any[]>();
  @Output() onPageChange = new EventEmitter<PageEvent>();

  protected displayedColumns: string[] = [];
  protected displayedItemDetailsColumns: string[] = [];
  protected dataSource: MatTableDataSource<Data>;
  protected itemDetailsSource: MatTableDataSource<Data>;
  protected inputFilter = '';
  protected expandedElement: any | null = null;
  protected itemsSelected: any[] = [];
  protected confirmationOptionButtons: DialogActionButtonsType[] = [];

  protected dataSourceLength = 0;
  protected itemDetailsSourceLength = 0;
  protected pageSize = 10;
  protected pageIndex = 0;
  protected pageSizeOptions = this.appConst.TABLE.PAGE_SIZE_OPTIONS;
  protected pageEvent: PageEvent | undefined;

  constructor(private boxDialogService: BoxDialogService) {
    this.dataSource = new MatTableDataSource<Data>([]);
    this.itemDetailsSource = new MatTableDataSource<Data>([]);
  }

  private hasDataSource(): boolean {
    return this.dataSourceLength > 0;
  }

  private updateDataTable(dataTable: any[]): void {
    this.dataSource.data = dataTable || [];
    this.dataSourceLength = dataTable?.length || 0;
  }

  private updateItemDetailsTable(itemDetailsTable: any[]): void {
    this.itemDetailsTable = itemDetailsTable || [];
    this.itemDetailsSource.data = itemDetailsTable || [];
    this.itemDetailsSourceLength = itemDetailsTable?.length || 0;
  }

  private applyLocalDataFilter(): void {
    const filteredDataLocal = DataFilterUtil.filter(this.dataTable, this.inputFilter);
    this.updateDataTable(filteredDataLocal);
  }

  private updateDataColumns(): void {
    this.displayedColumns = [...this.dataColumns.map((col) => col.key)];
    this.displayedItemDetailsColumns = [...this.itemDetailsColumns.map((col) => col.key)];

    if (this.showActionsColumn()) {
      this.displayedColumns.push('actions');
    }

    if (this.showActionDeleteAll) {
      this.displayedColumns.unshift('checkbox-column')
    }
  }

  private createListEventsForValidation(): EventValidationType[] {
    return [
      {propName: 'isHttpRequest', propValue: this.isHttpRequest, eventName: 'onPageChange', event: this.onPageChange},
      {propName: 'isHttpRequest', propValue: this.isHttpRequest, eventName: 'onFilter', event: this.onFilter},
      {propName: 'showActionDelete', propValue: this.showActionDelete, eventName: 'onDelete', event: this.onDelete},
      {
        propName: 'showActionDeleteAll',
        propValue: this.showActionDeleteAll,
        eventName: 'onDeleteAll',
        event: this.onDeleteAll
      },
      {propName: 'showActionEdit', propValue: this.showActionEdit, eventName: 'onEdit', event: this.onEdit},
      {propName: 'showActionCreate', propValue: this.showActionCreate, eventName: 'onCreate', event: this.onCreate},
      {
        propName: 'showActionDetails',
        propValue: this.showActionDetails,
        eventName: 'onViewItemDetails',
        event: this.onViewItemDetails
      },
      {
        propName: 'showActionRefresh',
        propValue: this.showActionRefresh,
        eventName: 'onRefresh',
        event: this.onRefresh
      },
      {
        propName: 'showActionExportPdf',
        propValue: this.showActionExportPdf,
        eventName: 'onExportPdf',
        event: this.onExportPdf
      },
      {
        propName: 'showActionExportCsv',
        propValue: this.showActionExportCsv,
        eventName: 'onExportCsv',
        event: this.onExportCsv
      },
    ];
  }

  private runOnInitValidations(): void {
    DataTableValidation.checkDataColumns(this.dataColumns);
    if (this.showActionDetails) {
      DataTableValidation.checkItemDetailsColumns(this.itemDetailsColumns, 'showActionDetails');
    }
    const eventValidation = this.createListEventsForValidation()
    DataTableValidation.checkSignedEventEmitter(eventValidation);
  }

  private handleTableChange(change: SimpleChange, tableName: string, updateFn: (data: any[]) => void): void {
    if (change.currentValue !== change.previousValue) {
      if (Array.isArray(change.currentValue)) {
        updateFn(change.currentValue);
      } else {
        throw new Error(`${tableName} must be a valid array.`);
      }
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.runOnInitValidations();
    this.updateDataColumns();
    this.updateDataTable(this.dataTable);
    this.updateItemDetailsTable(this.itemDetailsTable);
  }

  ngOnChanges(changes: SimpleChanges) {
    const tablesToUpdate = [
      {key: 'dataTable', updateFn: this.updateDataTable.bind(this)},
      {key: 'itemDetailsTable', updateFn: this.updateItemDetailsTable.bind(this)}
    ];
    tablesToUpdate.forEach(({key, updateFn}) => {
      const change = changes[key];
      if (change) {
        this.handleTableChange(change, key, updateFn);
      }
    });
  }

  get allItemsSelected(): boolean {
    return this.itemsSelected.length === this.dataSource.data.length && this.dataSource.data.length > 0;
  }

  get indeterminate(): boolean {
    return this.itemsSelected.length > 0 && this.itemsSelected.length < this.dataSource.data.length;
  }

  protected disabledButtonDeleteAll(): boolean {
    return this.itemsSelected.length === 0;
  }

  protected disabledHeaderCheckbox(): boolean {
    return !this.hasDataSource();
  }

  protected toggleItemsSelectedAll(event: any): void {
    if (event.checked) {
      this.itemsSelected = [...this.dataSource.data];
    } else {
      this.itemsSelected = [];
    }
  }

  protected toggleItemSelected(element: any, event: any): void {
    if (event.checked) {
      this.itemsSelected.push(element);
    } else {
      this.itemsSelected = this.itemsSelected.filter(item => item !== element);
    }
  }

  private resetItemsSelected(): void {
    this.itemsSelected = [];
  }

  protected isExpandedElement(element: any): boolean {
    return this.expandedElement === element;
  };

  protected showActionsColumn(): boolean {
    return this.showActionDetails || this.showActionEdit || this.showActionDelete;
  }

  protected showHandles(): boolean {
    return this.showActionCreate || this.showActionDeleteAll || this.showInputFilter || this.showActionRefresh;
  }

  protected showReports(): boolean {
    return this.showActionExportPdf || this.showActionExportCsv;
  }

  protected applyMaxHeight(): string {
    return this.maxHeight > 0 ? 'max-height:'.concat(String(this.maxHeight)).concat('px;') : '';
  }

  protected async refreshTable(): Promise<void> {
    await this.emitRefresh();
    await this.clearInputFilter();
  }

  private emitRefresh(): Promise<void> {
    return new Promise((resolve) => {
      this.onRefresh.emit();
      resolve();
    })
  }

  protected async clearInputFilter(): Promise<void> {
    this.inputFilter = '';
    await this.filterData();
  }

  protected async filterData(): Promise<void> {
    if (this.isHttpRequest && this.onFilter) {
      await this.emitSearch();
    } else {
      this.applyLocalDataFilter();
    }
  }

  private emitSearch(): Promise<void> {
    return new Promise((resolve) => {
      this.onFilter.emit(this.inputFilter);
      resolve();
    });
  }

  protected async toggleDetail(element: any): Promise<void> {
    this.expandedElement = this.expandedElement === element ? null : element;
    if (this.expandedElement) {
      await this.emitViewItemDetails(element);
    } else {
      this.updateItemDetailsTable([])
    }
  }

  private emitViewItemDetails(item: any): Promise<void> {
    return new Promise((resolve) => {
      this.onViewItemDetails.emit(item);
      resolve();
    })
  }

  protected async exportToPdf(): Promise<void> {
    await this.emitExportPdf();
  }

  private emitExportPdf(): Promise<void> {
    return new Promise((resolve) => {
      this.onExportPdf.emit(this.itemsSelected);
      resolve();
    })
  }

  protected async exportToCsv(): Promise<void> {
    await this.emitExportCsv();
  }

  private emitExportCsv(): Promise<void> {
    return new Promise((resolve) => {
      this.onExportCsv.emit(this.itemsSelected);
      resolve();
    })
  }

  protected async editItem(item: any): Promise<void> {
    await this.emitEdit(item);
    await this.clearInputFilter();
  }

  private emitEdit(item: any): Promise<void> {
    return new Promise((resolve) => {
      this.onEdit.emit(item);
      resolve();
    })
  }

  protected async createItem(): Promise<void> {
    await this.emitCreate();
    await this.clearInputFilter();
  }

  private emitCreate(): Promise<void> {
    return new Promise((resolve) => {
      this.onCreate.emit();
      resolve();
    })
  }

  protected confirmDeleteItem(element: any): void {
    this.confirmationOptionButtons = [];
    this.confirmationOptionButtons.push({
      label: this.appConst.ACTION_BUTTON.LABEL.YES,
      callback: async () => {
        await this.emitDelete(element);
        this.resetItemsSelected();
        await this.clearInputFilter();
      }
    })
    this.boxDialogService.openBoxDialogAttention(
      this.messages.DELETE_DIALOG,
      this.confirmationOptionButtons
    );

  }

  private emitDelete(item: any): Promise<void> {
    return new Promise((resolve) => {
      this.onDelete?.emit(item);
      resolve();
    });
  }

  protected confirmDeleteAllItems(): void {
    this.confirmationOptionButtons = [];
    this.confirmationOptionButtons.push({
      label: this.appConst.ACTION_BUTTON.LABEL.YES,
      callback: async () => {
        await this.emitDeleteAllItems();
        this.resetItemsSelected();
        await this.clearInputFilter();
      }
    })
    this.boxDialogService.openBoxDialogAttention(
      this.messages.DELETE_ALL_DIALOG,
      this.confirmationOptionButtons
    );
  }

  private emitDeleteAllItems(): Promise<void> {
    return new Promise((resolve) => {
      this.onDeleteAll?.emit(this.itemsSelected);
      resolve();
    });
  }

  protected async pageChange(pageEvent: PageEvent): Promise<void> {

    if (this.isHttpRequest && this.onPageChange) {
      await this.emitPageChange(pageEvent);
    } else {
      this.pageEvent = pageEvent;
      this.dataSourceLength = pageEvent.length;
      this.pageSize = pageEvent.pageSize;
      this.pageIndex = pageEvent.pageIndex;
    }
  }

  private emitPageChange(pageEvent: PageEvent): Promise<void> {
    return new Promise((resolve) => {
      this.onPageChange.emit(pageEvent);
      resolve();
    });
  }
}
