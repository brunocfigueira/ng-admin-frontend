import { DataFilterUtil } from './data-filter-util';

describe('DataFilterUtil', () => {
  it('should return the original array if there are no items', () => {
    const result = DataFilterUtil.filter([], 'search');
    expect(result).toEqual([]);
  });

  it('must return the original array if the search string is empty', () => {
    const items = [{ name: 'Alice' }, { name: 'Bob' }];
    const result = DataFilterUtil.filter(items, '');
    expect(result).toEqual(items);
  });

  it('must filter objects from the array based on the search string', () => {
    const items = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 35 },
    ];
    const result = DataFilterUtil.filter(items, 'bob');
    expect(result).toEqual([{ name: 'Bob', age: 30 }]);
  });

  it('must filter objects considering only the specified keys', () => {
    const items = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 35 },
    ];
    const result = DataFilterUtil.filter(items, '35', ['age']);
    expect(result).toEqual([{ name: 'Charlie', age: 35 }]);
  });

  it('should return an empty array if no items match the filter', () => {
    const items = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
    ];
    const result = DataFilterUtil.filter(items, 'Charlie');
    expect(result).toEqual([]);
  });

  it('should ignore keys that are not strings', () => {
    const items = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
    ];
    const result = DataFilterUtil.filter(items, '25');
    expect(result).toEqual([]);
  });

  it('should work correctly with unspecified keys (all keys)', () => {
    const items = [
      { name: 'Alice', age: '25' },
      { name: 'Bob', age: '30' },
    ];
    const result = DataFilterUtil.filter(items, '30');
    expect(result).toEqual([{ name: 'Bob', age: '30' }]);
  });

  it('must be case insensitive', () => {
    const items = [
      { name: 'Alice', age: 25 },
      { name: 'BOB', age: 30 },
    ];
    const result = DataFilterUtil.filter(items, 'bob');
    expect(result).toEqual([{ name: 'BOB', age: 30 }]);
  });
});
