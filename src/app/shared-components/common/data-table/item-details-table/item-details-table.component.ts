import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {APP_CONST} from "../../../../constants/app-constants";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatNoDataRow,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {NgForOf, NgIf} from "@angular/common";
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {DataTableColumnType} from '../../../types/data-table-type';
import {Data} from '@angular/router';
import {DataFilterUtil} from '../../../../utils/data-filter-util';
import {MatFormField, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-item-details-table',
  imports: [
    MatCell,
    MatHeaderCell,
    MatHeaderRow,
    MatRow,
    MatSort,
    MatSortHeader,
    MatTable,
    NgForOf,
    MatColumnDef,
    MatNoDataRow,
    MatPaginator,
    NgIf,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    MatTooltip,
    FormsModule,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './item-details-table.component.html',
  styleUrl: './item-details-table.component.css'
})
export class ItemDetailsTableComponent implements OnInit, OnChanges {
  protected readonly appConst = APP_CONST;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() detailTitle: string = this.appConst.TABLE.LABEL.DETAIL_TITLE;
  @Input() showPagination: boolean = true;
  @Input() showSearch: boolean = true;
  @Input() maxHeight: number = 0;
  @Input() dataColumns: DataTableColumnType[] = [];
  @Input() dataTable: any[] = [];

  protected displayedColumns: string[] = [];
  protected dataSource: MatTableDataSource<Data>;
  protected inputFilter = '';
  protected dataSourceLength = 0;
  protected pageSize = 10;
  protected pageIndex = 0;
  protected pageSizeOptions = this.appConst.TABLE.PAGE_SIZE_OPTIONS;
  protected pageEvent: PageEvent | undefined;

  constructor() {
    this.dataSource = new MatTableDataSource<Data>([]);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.updateDataColumns();

  }

  ngOnChanges(changes: SimpleChanges): void {
    const dataTable = changes['dataTable'];
    if (dataTable) {
      this.updateDataTable(dataTable.currentValue);
    }
  }

  private updateDataTable(dataTable: any[]): void {
    this.dataSource.data = dataTable || [];
    this.dataSourceLength = dataTable?.length || 0;
  }

  private updateDataColumns(): void {
    this.displayedColumns = [...this.dataColumns.map((col) => col.key)];
  }

  protected applyMaxHeight(): string {
    return this.maxHeight > 0 ? 'max-height:'.concat(String(this.maxHeight)).concat('px;') : '';
  }

  protected clearInputFilter(): void {
    this.inputFilter = '';
    this.filterData();
  }

  protected filterData(): void {
    const filteredDataLocal = DataFilterUtil.filter(this.dataTable, this.inputFilter);
    this.updateDataTable(filteredDataLocal);
  }

  protected pageChange(pageEvent: PageEvent): void {
    this.pageEvent = pageEvent;
    this.dataSourceLength = pageEvent.length;
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
  }
}
