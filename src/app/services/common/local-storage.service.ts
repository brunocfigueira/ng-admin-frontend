import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  /**
   * Save an item to localStorage.
   * @param key The key under which the data will be stored.
   * @param value The data to store, must be serializable to JSON.
   */
  createItem(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Retrieve an item from localStorage.
   * @param key The key of the data to retrieve.
   * @returns The parsed data or null if the key does not exist.
   */
  getItem<T>(key: string): T | null {
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) as T : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  /**
   * Update an existing item in localStorage.
   * @param key The key of the data to update.
   * @param value The new data to store, must be serializable to JSON.
   */
  updateItem(key: string, value: any): void {
    this.createItem(key, value);
  }

  /**
   * Delete an item from localStorage.
   * @param key The key of the data to delete.
   */
  deleteItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  /**
   * Clear all data from localStorage.
   */
  deleteAllItems(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Retrieve all items from localStorage.
   * @returns An object containing all key-value pairs in localStorage.
   */
  getAllItems(): { [key: string]: any } {
    try {
      const items: { [key: string]: any } = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          items[key] = this.getItem(key);
        }
      }
      return items;
    } catch (error) {
      console.error('Error retrieving all items from localStorage:', error);
      return {};
    }
  }
}
