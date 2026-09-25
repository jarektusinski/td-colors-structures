import colorUtils, { Color as ColorType, RgbaProp } from 'td-colors-utils';

const { toRgbaProp } = colorUtils;

// @internal
// TODO: replace with function from dedicated library
function isNumber(value: unknown): boolean {
  return typeof value === 'number';
}

// @internal
// TODO: replace with function from dedicated library
function toNumber(value: unknown): number {
  return parseInt((value || 0).toString());
}

const MAX_ALPHA_VALUE = 100;

export default abstract class AbstractColor {
  protected _rgba: RgbaProp;

  protected Constructor = this.constructor as new (
    red?: number,
    green?: number,
    blue?: number,
    alpha?: number
  ) => this;

  public constructor(color: ColorType);
  public constructor(red?: number, green?: number, blue?: number, alpha?: number);

  public constructor(...args: unknown[]) {
    if (args.length === 1 && !isNumber(args[0])) {
      const color = toRgbaProp(args[0] as ColorType);
      color.alpha = (color.alpha ?? 1) * MAX_ALPHA_VALUE;
      this._rgba = color;
    } else {
      this._rgba = {
        red: toNumber(args[0]),
        green: toNumber(args[1]),
        blue: toNumber(args[2]),
        alpha: toNumber(args[3] ?? MAX_ALPHA_VALUE),
      };
    }
  }

  /**
   * Serializes the current color to its string representation.
   */
  public abstract toString(): string;

  get alpha(): number {
    return this._rgba.alpha! / MAX_ALPHA_VALUE;
  }

  get blue(): number {
    return this._rgba.blue;
  }

  get green(): number {
    return this._rgba.green;
  }

  get red(): number {
    return this._rgba.red;
  }

  get rgba(): RgbaProp {
    return {
      ...this._rgba,
      alpha: this.alpha,
    };
  }

  /**
   * Compares whether this color is equal to another one in all channels.
   */
  public equals(color: AbstractColor): boolean {
    return (
      this.red === color.red &&
      this.blue === color.blue &&
      this.green === color.green &&
      this.alpha === color.alpha
    );
  }

  /**
   * Checks whether the total channel sum is greater than the provided color.
   */
  public greaterThan(color: AbstractColor): boolean {
    return (
      this.red + this.blue + this.green + this.alpha >
      color.red + color.blue + color.green + color.alpha
    );
  }

  /**
   * Checks whether the total channel sum is smaller than the provided color.
   */
  public lessThan(color: AbstractColor): boolean {
    return (
      this.red + this.blue + this.green + this.alpha <
      color.red + color.blue + color.green + color.alpha
    );
  }

  /**
   * Checks whether this color is the same or lighter than the provided one.
   */
  public greaterOrEqual(color: AbstractColor): boolean {
    return this.greaterThan(color) || this.equals(color);
  }

  /**
   * Checks whether this color is the same or darker than the provided one.
   */
  public lessOrEqual(color: AbstractColor): boolean {
    return this.lessThan(color) || this.equals(color);
  }

  /**
   * Determines whether this color is darker or equal channel-by-channel.
   */
  public darkerThan(color: AbstractColor): boolean {
    return (
      this.alpha <= color.alpha &&
      this.green <= color.green &&
      this.blue <= color.blue &&
      this.red <= color.red
    );
  }

  /**
   * Determines whether this color is lighter or equal channel-by-channel.
   */
  public lighterThan(color: AbstractColor): boolean {
    return (
      this.alpha >= color.alpha &&
      this.green >= color.green &&
      this.blue >= color.blue &&
      this.red >= color.red
    );
  }

  /**
   * Creates a new color instance with identical RGB values.
   */
  public clone(): this {
    return new this.Constructor(
      this._rgba.red,
      this._rgba.green,
      this._rgba.blue,
      this._rgba.alpha
    );
  }

  /**
   * Returns perceived brightness based on the standard luminance formula.
   */
  protected brightness(): number {
    return this.red * 0.299 + this.green * 0.587 + this.blue * 0.114;
  }
}
