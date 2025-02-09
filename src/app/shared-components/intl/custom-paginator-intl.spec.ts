import { CustomPaginatorIntl } from './custom-paginator-intl';

describe('CustomPaginatorIntl', () => {
  let paginator: CustomPaginatorIntl;

  beforeEach(() => {
    paginator = new CustomPaginatorIntl();
  });

  it('must have custom labels for pagination', () => {
    expect(paginator.itemsPerPageLabel).toBe('Itens por página:');
    expect(paginator.nextPageLabel).toBe('Próxima página');
    expect(paginator.previousPageLabel).toBe('Página anterior');
    expect(paginator.firstPageLabel).toBe('Primeira página');
    expect(paginator.lastPageLabel).toBe('Última página');
  });

  describe('getRangeLabel', () => {
    it('should return "0 of 0" when length is 0', () => {
      const result = paginator.getRangeLabel(0, 10, 0);
      expect(result).toBe('0 of 0');
    });

    it('should return "0 of 100" when pageSize is 0', () => {
      const result = paginator.getRangeLabel(0, 0, 100);
      expect(result).toBe('0 of 100');
    });

    it('should return the correct range when there are multiple pages', () => {
      const result = paginator.getRangeLabel(0, 10, 100);
      expect(result).toBe('1 – 10 of 100');
    });

    it('should return the correct range for an intermediate page', () => {
      const result = paginator.getRangeLabel(2, 10, 100);
      expect(result).toBe('21 – 30 of 100');
    });

    it('should return the correct range for the last page', () => {
      const result = paginator.getRangeLabel(9, 10, 100);
      expect(result).toBe('91 – 100 of 100');
    });

    it('must correctly handle values that are not divisible', () => {
      const result = paginator.getRangeLabel(0, 7, 50);
      expect(result).toBe('1 – 7 of 50');
    });
  });
});
