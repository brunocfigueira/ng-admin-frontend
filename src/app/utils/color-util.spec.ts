import { ColorUtil } from './color-util';

describe('ColorUtil', () => {
  describe('getTextColorForBackground', () => {
    it('should return "#111111" (black) for a light background color', () => {
      const backgroundColor = '#FFFFFF'; // Cor branca
      const result = ColorUtil.getTextColorForBackground(backgroundColor);
      expect(result).toBe('#111111');
    });

    it('should return "#FFFFFF" (white) for a dark background color', () => {
      const backgroundColor = '#000000'; // Cor preta
      const result = ColorUtil.getTextColorForBackground(backgroundColor);
      expect(result).toBe('#FFFFFF');
    });

    it('should return "#FFFFFF" for a medium dark background color', () => {
      const backgroundColor = '#555555'; // Cinza escuro
      const result = ColorUtil.getTextColorForBackground(backgroundColor);
      expect(result).toBe('#FFFFFF');
    });

    it('should return "#111111" for a medium light background color', () => {
      const backgroundColor = '#DDDDDD'; // Cinza claro
      const result = ColorUtil.getTextColorForBackground(backgroundColor);
      expect(result).toBe('#111111');
    });

    it('should handle background colors without a "#" prefix', () => {
      const backgroundColor = 'FFFFFF'; // Branco sem o "#"
      const result = ColorUtil.getTextColorForBackground(backgroundColor);
      expect(result).toBe('#111111');
    });

    it('should handle lowercase hex codes', () => {
      const backgroundColor = '#ffffff'; // Branco em letras minúsculas
      const result = ColorUtil.getTextColorForBackground(backgroundColor);
      expect(result).toBe('#111111');
    });

    it('should handle complex colors and return the correct text color', () => {
      const backgroundColor1 = '#4A90E2'; // Azul médio
      const result1 = ColorUtil.getTextColorForBackground(backgroundColor1);
      expect(result1).toBe('#111111');

      const backgroundColor2 = '#FFDD00'; // Amarelo
      const result2 = ColorUtil.getTextColorForBackground(backgroundColor2);
      expect(result2).toBe('#111111');
    });

    it('should throw an error for invalid hex colors', () => {
      const backgroundColor = '#XYZ123'; // Cor inválida

      expect(() => ColorUtil.getTextColorForBackground(backgroundColor)).toThrowError();
    });
  });
});
