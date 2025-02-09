import {Component} from '@angular/core';
import {LocalStorageService} from '../../../../services/common/local-storage.service';
import {ActionButtonComponent} from '../../../../shared-components/common/action-button/action-button.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-local-storage-example',
  imports: [
    ActionButtonComponent,
    JsonPipe
  ],
  templateUrl: './local-storage-example.component.html',
  styleUrl: './local-storage-example.component.css'
})
export class LocalStorageExampleComponent {
  protected results: any;

  constructor(private localStorageService: LocalStorageService) {
  }

  protected eventCreateItem() {
    this.localStorageService.createItem('name', 'Test Name');
    this.eventGetAllItems();
  }

  protected eventUpdateItem() {
    this.localStorageService.updateItem('name', 'Test Name Update');
    this.eventGetAllItems();
  }

  protected eventGetItem() {
    this.getItem('name');
  }

  protected eventDeleteItem() {
    this.removeItem('name');
    this.eventGetAllItems();
  }

  private removeItem(key: string): void {
    this.localStorageService.deleteItem(key);
  }

  private getItem(key: string) {
    this.results = this.localStorageService.getItem(key);
  }

  protected eventGetAllItems() {
    this.results = this.localStorageService.getAllItems();
  }

  protected eventDeleteAllItems() {
    this.localStorageService.deleteAllItems();
    this.eventGetAllItems();
  }

  protected eventCreateObject() {
    this.localStorageService.createItem('object', {code: '123', name: 'Test Name'});
    this.eventGetAllItems();
  }

  protected eventUpdateObject() {
    this.localStorageService.updateItem('object', {code: '123', name: 'Test Name Update'});
    this.eventGetAllItems();
  }

  protected eventDeleteObject() {
    this.removeItem('object');
    this.eventGetAllItems();
  }

  protected eventGetObject() {
    this.getItem('object');
  }

  protected eventCreateListObject() {
    const listObjects = [
      {code: '123', name: 'Test Name 1'},
      {code: '456', name: 'Test Name 2'},
      {code: '789', name: 'Test Name 3'},
    ]
    this.localStorageService.createItem('object', listObjects);
    this.eventGetAllItems();
  }

  protected eventGetListObject() {
    this.getItem('object');
  }

  protected eventUpdateListObject() {
    const listObjects = [
      {code: '123', name: 'Test Name Update 1'},
      {code: '456', name: 'Test Name Update 2'},
      {code: '789', name: 'Test Name Update 3'},
    ]
    this.localStorageService.updateItem('object', listObjects);
    this.eventGetObject();
  }
  protected eventDeleteListObject(){
    this.removeItem('object');
    this.eventGetAllItems();
  }
}
