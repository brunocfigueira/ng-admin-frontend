import {EventEmitter, Injectable} from '@angular/core';
import {DataTableColumnType, EventValidationType} from '../types/data-table-type';

@Injectable({
  providedIn: 'root'
})
export class DataTableValidation {
  static readonly MESSAGE_TEMPLATE = 'To use the [{}]="true" parameter, it is necessary to create a method to listen to the {} event. ({})="itsImplementation"';
  static readonly MESSAGE_DATA_COLUMNS = 'To use the DataTableComponent, the [dataColumns] attribute must be defined';
  static readonly MESSAGE_ITEM_DETAILS_COLUMNS = 'To use the DataTableComponent, with [{}]="true" parameter the [itemDetailsColumns] attribute must be defined';

  private static hasSignedEventHandler(event: EventEmitter<any>): boolean {
    return event && event.observers && event.observers.length > 0;
  }

  static checkSignedEventEmitter(eventValidation: EventValidationType[]): void {

    eventValidation.forEach(event => {
      if (event.propValue && !this.hasSignedEventHandler(event.event)) {
        const message = this.MESSAGE_TEMPLATE
          .replace('{}', event.propName)
          .replace('{}', event.eventName)
          .replace('{}', event.eventName);
        throw new Error(message);
      }
    });
  }

  static checkDataColumns(columns: DataTableColumnType[]): void {
    if (columns && columns.length === 0) {
      throw new Error(this.MESSAGE_DATA_COLUMNS);
    }
  }

  static checkItemDetailsColumns(columns: DataTableColumnType[], propName: string): void {
    if (columns && columns.length === 0) {
      const message = this.MESSAGE_ITEM_DETAILS_COLUMNS
        .replace('{}', propName);
      throw new Error(message);
    }
  }
}
