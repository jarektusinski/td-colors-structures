import colorUtils from 'td-colors-utils';
import RgbaColor from '../RgbaColor/RgbaColor';

const { rgbaPropToHexa } = colorUtils;

const MAX_ALPHA_VALUE = 255;

export default class HexaColor extends RgbaColor {
  get alphaHex(): string {
    return this.decimalToHex(Math.round(this.alpha * MAX_ALPHA_VALUE));
  }

  get blueHex(): string {
    return this.decimalToHex(this.blue);
  }

  get greenHex(): string {
    return this.decimalToHex(this.green);
  }

  get redHex(): string {
    return this.decimalToHex(this.red);
  }

  /**
   * Serializes the color to its 8-digit HEXA representation.
   */
  public toString(): string {
    return rgbaPropToHexa(this.rgba);
  }

  /**
   * Converts a 0..255 channel value to a two-character hexadecimal string.
   * For alpha, the normalized 0..1 value is converted to 0..255 before formatting.
   */
  private decimalToHex(decimal: number): string {
    return decimal.toString(16).padStart(2, '0');
  }
}
