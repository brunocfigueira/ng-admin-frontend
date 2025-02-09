import {EventEmitter} from '@angular/core';

export type DataTableColumnType = {
  key: string;
  title: string;
};

export type EventValidationType = {
  propName: string;
  propValue: boolean;
  eventName: string;
  event: EventEmitter<any>;
};

export type DataTableTypes = {
  dataTableColumns: DataTableColumnType[];
  eventValidation: EventValidationType[];
};
