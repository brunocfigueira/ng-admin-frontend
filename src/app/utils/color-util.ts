export class ColorUtil {
  /**
   * Retorna a cor ideal para o texto (preto ou branco) com base na cor de fundo fornecida.
   * @param backgroundColor A cor de fundo em formato hexadecimal (ex.: "#ffffff").
   * @returns A cor do texto ("black" ou "white").
   */
  static getTextColorForBackground(backgroundColor: string): string {
    // Valida se a cor hexadecimal é válida
    const isValidHex = (hex: string): boolean => {
      const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
      return hexRegex.test(hex);
    };

    if (!isValidHex(backgroundColor)) {
      throw new Error(`Invalid hexadecimal color: ${backgroundColor}`);
    }

    // Função para converter HEX para RGB
    const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
      // Remove o '#' se existir
      hex = hex.replace('#', '');

      // Converte para RGB
      const bigint = parseInt(hex, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };

    // Converter a cor hexadecimal para valores RGB
    const { r, g, b } = hexToRgb(backgroundColor);

    // Normalizar valores RGB para o intervalo 0-1
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    // Calcular a luminosidade relativa usando a fórmula WCAG
    const luminance = 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;

    // Retornar "black" para cores claras ou "white" para cores escuras
    return luminance > 0.5 ? '#111111' : '#FFFFFF';
  }
}
