import { EventEmitter } from '@angular/core';
import { DataTableValidation } from './data-table-validation';
import { DataTableColumnType, EventValidationType } from '../types/data-table-type';

describe('DataTableValidation', () => {
  describe('checkSignedEventEmitter', () => {
    it('should throw an error when a required event is not handled', () => {
      const eventValidation: EventValidationType[] = [
        {
          propName: 'sortable',
          propValue: true,
          eventName: 'sortChange',
          event: new EventEmitter<any>(),
        },
      ];

      expect(() => DataTableValidation.checkSignedEventEmitter(eventValidation))
        .toThrowError(
          'To use the [sortable]="true" parameter, it is necessary to create a method to listen to the sortChange event. (sortChange)="itsImplementation"'
        );
    });

    it('should not throw an error when all required events are handled', () => {
      const eventEmitter = new EventEmitter<any>();
      eventEmitter.subscribe(() => {}); // Simula a assinatura do evento

      const eventValidation: EventValidationType[] = [
        {
          propName: '[sortable]',
          propValue: true,
          eventName: '(sortChange)',
          event: eventEmitter,
        },
      ];

      expect(() => DataTableValidation.checkSignedEventEmitter(eventValidation)).not.toThrow();
    });

    it('should not throw an error when no event validation is required', () => {
      const eventValidation: EventValidationType[] = [
        {
          propName: '[sortable]',
          propValue: false,
          eventName: '(sortChange)',
          event: new EventEmitter<any>(),
        },
      ];

      expect(() => DataTableValidation.checkSignedEventEmitter(eventValidation)).not.toThrow();
    });
  });

  describe('checkDataColumns', () => {
    it('should throw an error if columns are empty', () => {
      const columns: DataTableColumnType[] = [];

      expect(() => DataTableValidation.checkDataColumns(columns))
        .toThrowError('To use the DataTableComponent, the [dataColumns] attribute must be defined');
    });

    it('should not throw an error if columns are defined', () => {
      const columns: DataTableColumnType[] = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Name' },
      ];

      expect(() => DataTableValidation.checkDataColumns(columns)).not.toThrow();
    });
  });

  describe('checkItemDetailsColumns', () => {
    it('should throw an error if itemDetailsColumns are empty', () => {
      const columns: DataTableColumnType[] = [];
      const propName = 'expandable';

      expect(() => DataTableValidation.checkItemDetailsColumns(columns, propName))
        .toThrowError(
          'To use the DataTableComponent, with [expandable]="true" parameter the [itemDetailsColumns] attribute must be defined'
        );
    });

    it('should not throw an error if itemDetailsColumns are defined', () => {
      const columns: DataTableColumnType[] = [
        { key: 'detail', title: 'Detail' },
      ];
      const propName = '[expandable]';

      expect(() => DataTableValidation.checkItemDetailsColumns(columns, propName)).not.toThrow();
    });
  });
});
