import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

    // Limpa o localStorage antes de cada teste
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save an item to localStorage', () => {
    const key = 'testKey';
    const value = { name: 'Test' };

    service.createItem(key, value);

    const storedValue = localStorage.getItem(key);
    expect(storedValue).toBe(JSON.stringify(value));
  });

  it('should retrieve an item from localStorage', () => {
    const key = 'testKey';
    const value = { name: 'Test' };
    localStorage.setItem(key, JSON.stringify(value));

    const result = service.getItem<typeof value>(key);
    expect(result).toEqual(value);
  });

  it('should return null if item does not exist in localStorage', () => {
    const result = service.getItem('nonExistentKey');
    expect(result).toBeNull();
  });

  it('should update an existing item in localStorage', () => {
    const key = 'testKey';
    const initialValue = { name: 'Initial' };
    const updatedValue = { name: 'Updated' };

    service.createItem(key, initialValue);
    service.updateItem(key, updatedValue);

    const storedValue = localStorage.getItem(key);
    expect(storedValue).toBe(JSON.stringify(updatedValue));
  });

  it('should delete an item from localStorage', () => {
    const key = 'testKey';
    const value = { name: 'Test' };
    localStorage.setItem(key, JSON.stringify(value));

    service.deleteItem(key);

    const storedValue = localStorage.getItem(key);
    expect(storedValue).toBeNull();
  });

  it('should clear all items from localStorage', () => {
    localStorage.setItem('key1', 'value1');
    localStorage.setItem('key2', 'value2');

    service.deleteAllItems();

    expect(localStorage.length).toBe(0);
  });

  it('should retrieve all items from localStorage', () => {
    const items = {
      key1: { name: 'Value1' },
      key2: { name: 'Value2' },
    };

    localStorage.setItem('key1', JSON.stringify(items.key1));
    localStorage.setItem('key2', JSON.stringify(items.key2));

    const result = service.getAllItems();

    expect(result).toEqual(items);
  });

  it('should handle errors gracefully in createItem', () => {
    spyOn(JSON, 'stringify').and.throwError('Test error');
    spyOn(console, 'error');

    service.createItem('testKey', {});

    expect(console.error).toHaveBeenCalledWith('Error saving to localStorage:', jasmine.any(Error));
  });

  it('should handle errors gracefully in getItem', () => {
    spyOn(JSON, 'parse').and.throwError('Test error');
    spyOn(console, 'error');

    localStorage.setItem('testKey', 'invalid json');
    const result = service.getItem('testKey');

    expect(console.error).toHaveBeenCalledWith('Error reading from localStorage:', jasmine.any(Error));
    expect(result).toBeNull();
  });

  it('should handle errors gracefully in deleteItem', () => {
    spyOn(localStorage, 'removeItem').and.throwError('Test error');
    spyOn(console, 'error');

    service.deleteItem('testKey');

    expect(console.error).toHaveBeenCalledWith('Error removing from localStorage:', jasmine.any(Error));
  });

  it('should handle errors gracefully in deleteAllItems', () => {
    spyOn(localStorage, 'clear').and.throwError('Test error');
    spyOn(console, 'error');

    service.deleteAllItems();

    expect(console.error).toHaveBeenCalledWith('Error clearing localStorage:', jasmine.any(Error));
  });
});
