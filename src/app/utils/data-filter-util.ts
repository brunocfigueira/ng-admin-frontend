export class DataFilterUtil {
  /**
   * Filtra um array de objetos com base em uma string de busca.
   * @param items Array de objetos a ser filtrado.
   * @param searchString String de busca.
   * @param keys (opcional) Lista de chaves a serem consideradas no filtro.
   * Se não fornecido, todas as chaves do objeto serão utilizadas.
   * @returns Array filtrado.
   */
  static filter<T>(
    items: T[],
    searchString: string,
    keys?: (keyof T)[]
  ): T[] {
    if (!items || !searchString) {
      return items;
    }

    const lowerCaseSearch = searchString.toLowerCase();

    return items.filter((item) => {
      // Se nenhuma chave for especificada, filtrar por todas as chaves do objeto
      // @ts-ignore
      const searchKeys = keys || (Object.keys(item) as (keyof T)[]);
      return searchKeys.some((key) => {
        const value = item[key];
        if (value !== undefined && value !== null) {
          return String(value).toLowerCase().includes(lowerCaseSearch);
        }
        return false;
      });
    });
  }
}
