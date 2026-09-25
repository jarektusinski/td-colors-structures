import colorUtils, { RgbaProp } from 'td-colors-utils';
import AbstractColor from '../AbstractColor';

const { rgbaPropToRgba } = colorUtils;

// @internal
// TODO: replace with function from dedicated library
function isUndefined(value: unknown): boolean {
  return value === undefined;
}

// @internal
// TODO: replace with function from dedicated library
function toNumber(value: unknown): number {
  return parseInt((value || 0).toString());
}

const MAX_ALPHA_VALUE = 100;
const MAX_COLOR_VALUE = 255;
const MID_COLOR_VALUE = 128;

export default class RgbaColor extends AbstractColor {
  set alpha(value: number) {
    this._rgba.alpha = value;
  }

  set blue(value: number) {
    this._rgba.blue = value;
  }

  set green(value: number) {
    this._rgba.green = value;
  }

  set red(value: number) {
    this._rgba.red = value;
  }

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
   * Increments all RGB channels by the provided value.
   */
  public increment(value: number = 1): void {
    this.addToChannel('blue', value);
    this.addToChannel('green', value);
    this.addToChannel('red', value);
  }

  /**
   * Decrements all RGB channels by the provided value.
   */
  public decrement(value: number = 1): void {
    this.addToChannel('blue', -value);
    this.addToChannel('green', -value);
    this.addToChannel('red', -value);
  }

  /**
   * Adds values to the color channels.
   * If provided only value, it will be added to all channels.
   * Only one value is required, the rest are optional.
   * @param value - all or red
   * @param blue
   * @param green
   * @param alpha
   */
  public add(value?: number, green?: number, blue?: number, alpha?: number): this {
    if (isUndefined(value) && isUndefined(blue) && isUndefined(green) && isUndefined(alpha)) {
      throw new Error('At least one value must be provided to add method.');
    }

    blue ??= value;
    green ??= value;
    alpha ??= value;

    const color = this.clone();
    color.addToChannel('red', value);
    color.addToChannel('blue', blue);
    color.addToChannel('green', green);
    color.addToChannel('alpha', alpha);

    return color;
  }

  /**
   * Adds a value to the alpha channel.
   */
  public addAlpha(value: number = 0): this {
    const color = this.clone();
    color.addToChannel('alpha', value);

    return color;
  }

  /**
   * Adds a value to the blue channel.
   */
  public addBlue(value: number = 0): this {
    const color = this.clone();
    color.addToChannel('blue', value);

    return color;
  }

  /**
   * Adds a value to the green channel.
   */
  public addGreen(value: number = 0): this {
    const color = this.clone();
    color.addToChannel('green', value);

    return color;
  }

  /**
   * Adds a value to the red channel.
   */
  public addRed(value: number = 0): this {
    const color = this.clone();
    color.addToChannel('red', value);

    return color;
  }

  /**
   * Adds the channels of another color to this color.
   */
  public addColor(color: AbstractColor): this {
    return this.add(color.red, color.green, color.blue, color.alpha);
  }

  /**
   * Subtracts values from the color channels.
   * If provided only value, it will be subtracted from all channels.
   * Only one value is required, the rest are optional.
   * @param value (all or red)
   * @param blue
   * @param green
   * @param alpha
   */
  public subtract(value?: number, green?: number, blue?: number, alpha?: number): this {
    if (isUndefined(value) && isUndefined(blue) && isUndefined(green) && isUndefined(alpha)) {
      throw new Error('At least one value must be provided to subtract method.');
    }

    value ??= 0;
    blue ??= value;
    green ??= value;
    alpha ??= value;

    const color = this.clone();
    color.addToChannel('red', -value);
    color.addToChannel('blue', -blue);
    color.addToChannel('green', -green);
    color.addToChannel('alpha', -alpha);

    return color;
  }

  /**
   * Subtracts a value from the alpha channel.
   */
  public subtractAlpha(value: number = 0): this {
    const color = this.clone();
    color.addToChannel('alpha', -value);

    return color;
  }

  /**
   * Subtracts a value from the blue channel.
   */
  public subtractBlue(value: number = 0): this {
    const color = this.clone();
    color.addToChannel('blue', -value);

    return color;
  }

  /**
   * Subtracts a value from the green channel.
   */
  public subtractGreen(value: number = 0): this {
    const color = this.clone();
    color.addToChannel('green', -value);

    return color;
  }

  /**
   * Subtracts a value from the red channel.
   */
  public subtractRed(value: number = 0): this {
    const color = this.clone();
    color.addToChannel('red', -value);

    return color;
  }

  /**
   * Subtracts the channels of another color from this color.
   */
  public subtractColor(color: AbstractColor): this {
    return this.subtract(color.red, color.green, color.blue, color.alpha);
  }

  /**
   * Multiplies values of the color channels.
   * If provided only value, it will be multiplied to all channels.
   * Only one value is required, the rest are optional.
   * @param value (all or red)
   * @param blue
   * @param green
   * @param alpha
   */
  public multiply(value?: number, green?: number, blue?: number, alpha?: number): this {
    if (isUndefined(value) && isUndefined(blue) && isUndefined(green) && isUndefined(alpha)) {
      throw new Error('At least one value must be provided to multiply method.');
    }

    blue ??= value;
    green ??= value;
    alpha ??= value;

    const color = this.clone();
    color.multiplyTheChannel('red', value);
    color.multiplyTheChannel('blue', blue);
    color.multiplyTheChannel('green', green);
    color.multiplyTheChannel('alpha', alpha);

    return color;
  }

  /**
   * Multiplies the alpha channel by a value.
   */
  public multiplyAlpha(value: number = 0): this {
    const color = this.clone();
    color.multiplyTheChannel('alpha', value);

    return color;
  }

  /**
   * Multiplies the blue channel by a value.
   */
  public multiplyBlue(value: number = 0): this {
    const color = this.clone();
    color.multiplyTheChannel('blue', value);

    return color;
  }

  /**
   * Multiplies the green channel by a value.
   */
  public multiplyGreen(value: number = 0): this {
    const color = this.clone();
    color.multiplyTheChannel('green', value);

    return color;
  }

  /**
   * Multiplies the red channel by a value.
   */
  public multiplyRed(value: number = 0): this {
    const color = this.clone();
    color.multiplyTheChannel('red', value);

    return color;
  }

  /**
   * Divides values of the color channels.
   * If provided only value, it will be divided to all channels.
   * Only one value is required, the rest are optional.
   * @param value (all or red)
   * @param blue
   * @param green
   * @param alpha
   */
  public divide(value?: number, green?: number, blue?: number, alpha?: number): this {
    if (isUndefined(value) && isUndefined(blue) && isUndefined(green) && isUndefined(alpha)) {
      throw new Error('At least one value must be provided to divide method.');
    }

    blue ??= value;
    green ??= value;
    alpha ??= value;

    const color = this.clone();
    color.divideTheChannel('red', value);
    color.divideTheChannel('blue', blue);
    color.divideTheChannel('green', green);
    color.divideTheChannel('alpha', alpha);

    return color;
  }

  /**
   * Divides the alpha channel by a value.
   */
  public divideAlpha(value?: number): this {
    const color = this.clone();
    color.divideTheChannel('alpha', value);

    return color;
  }

  /**
   * Divides the blue channel by a value.
   */
  public divideBlue(value?: number): this {
    const color = this.clone();
    color.divideTheChannel('blue', value);

    return color;
  }

  /**
   * Divides the green channel by a value.
   */
  public divideGreen(value?: number): this {
    const color = this.clone();
    color.divideTheChannel('green', value);

    return color;
  }

  /**
   * Divides the red channel by a value.
   */
  public divideRed(value?: number): this {
    const color = this.clone();
    color.divideTheChannel('red', value);

    return color;
  }

  /**
   * Produces a midpoint color between this color and another color.
   */
  public average(color: AbstractColor): this {
    const averageColor = this.clone();
    averageColor.red = Math.floor((this.red + color.red) / 2);
    averageColor.blue = Math.floor((this.blue + color.blue) / 2);
    averageColor.green = Math.floor((this.green + color.green) / 2);
    averageColor.alpha = (this.alpha + color.alpha) / 2;

    return averageColor;
  }

  /**
   * Converts the color to a monochrome black-and-white threshold output.
   */
  public threshold(): this {
    const binary = this.brightness() > MID_COLOR_VALUE ? MAX_COLOR_VALUE : 0;
    return new this.Constructor(binary, binary, binary, this.alpha);
  }

  /**
   * Converts the color to grayscale based on luminance.
   */
  public grayscale(): this {
    const brightness = this.brightness();
    return new this.Constructor(brightness, brightness, brightness, this.alpha);
  }

  /**
   * Applies a sepia tone to the color.
   */
  public sepia(): this {
    return new this.Constructor(
      this.red * 0.393 + this.green * 0.769 + this.blue * 0.189,
      this.red * 0.349 + this.green * 0.686 + this.blue * 0.168,
      this.red * 0.272 + this.green * 0.534 + this.blue * 0.131,
      this.alpha
    );
  }

  /**
   * Creates a cyanotype-style effect based on brightness.
   */
  public cyanotype(): this {
    const brightness = this.brightness();
    return new this.Constructor(brightness * 0.4, brightness * 0.7, brightness, this.alpha);
  }

  /**
   * Inverts the red, green and blue channels.
   */
  public invert(): this {
    return new this.Constructor(
      MAX_COLOR_VALUE - this.red,
      MAX_COLOR_VALUE - this.green,
      MAX_COLOR_VALUE - this.blue,
      this.alpha
    );
  }

  /**
   * Solarizes the color by inverting channels above mid-tone threshold.
   */
  public solarize(): this {
    return new this.Constructor(
      this.red < MID_COLOR_VALUE ? this.red : MAX_COLOR_VALUE - this.red,
      this.green < MID_COLOR_VALUE ? this.green : MAX_COLOR_VALUE - this.green,
      this.blue < MID_COLOR_VALUE ? this.blue : MAX_COLOR_VALUE - this.blue,
      this.alpha
    );
  }

  /**
   * Swaps the red and green channels to create an infrared-like result.
   */
  public infrared(): this {
    return new this.Constructor(this.green, this.red, this.blue, this.alpha);
  }

  /**
   * Adjusts contrast by the supplied percentage-like value.
   */
  public contrast(value: number): this {
    const factor = (259 * (value + MAX_COLOR_VALUE)) / (MAX_COLOR_VALUE * (259 - value));
    return new this.Constructor(
      factor * (this.red - MID_COLOR_VALUE) + MID_COLOR_VALUE,
      factor * (this.green - MID_COLOR_VALUE) + MID_COLOR_VALUE,
      factor * (this.blue - MID_COLOR_VALUE) + MID_COLOR_VALUE,
      this.alpha
    );
  }

  /**
   * Saturates the color by a percentage value around its luminance.
   */
  public saturate(value: number): this {
    const brightness = this.brightness();
    const factor = value / 100;

    return this.add(
      (this.red - brightness) * factor,
      (this.green - brightness) * factor,
      (this.blue - brightness) * factor,
      0
    );
  }

  /**
   * Quantizes each channel to a fixed number of levels.
   */
  public quantize(levels: number): this {
    const factor = (MAX_COLOR_VALUE + 1) / levels;
    return new this.Constructor(
      Math.round(this.red / factor) * factor,
      Math.round(this.green / factor) * factor,
      Math.round(this.blue / factor) * factor,
      this.alpha
    );
  }

  /**
   * Brightens the color by adding the provided value to every channel.
   */
  public brighten(value: number): this {
    return this.add(value, value, value, 0);
  }

  /**
   * Darkens the color by subtracting the provided value from every channel.
   */
  public darken(value: number): this {
    return this.subtract(value, value, value, 0);
  }

  /**
   * Lightens the color by a percentage of the distance to white.
   */
  public lighten(percent: number): this {
    const factor = percent / 100;
    return this.add(
      (MAX_COLOR_VALUE - this.red) * factor, // 115,5
      (MAX_COLOR_VALUE - this.green) * factor,
      (MAX_COLOR_VALUE - this.blue) * factor,
      0
    );
  }

  /**
   * Dims the color by a percentage of its current channel values.
   */
  public dim(percent: number): this {
    const factor = percent / 100;
    return this.subtract(this.red * factor, this.green * factor, this.blue * factor, 0);
  }

  /**
   * Blends this color toward another color based on current luminance.
   */
  public duotone(color: AbstractColor): this {
    const brightness = this.brightness() / MAX_COLOR_VALUE;
    return this.add(
      (color.red - this.red) * brightness,
      (color.green - this.green) * brightness,
      (color.blue - this.blue) * brightness,
      0
    );
  }

  /**
   * Serializes the color as an RGBA string.
   */
  public toString(): string {
    return rgbaPropToRgba(this.rgba);
  }

  private addToChannel(channel: 'red' | 'green' | 'blue' | 'alpha', value?: number): void {
    if (channel === 'alpha') {
      this.alpha = Math.min(MAX_ALPHA_VALUE, this._rgba.alpha! + toNumber(value));
      return;
    }
    this[channel] = Math.min(MAX_COLOR_VALUE, this[channel] + toNumber(value));
  }

  private multiplyTheChannel(channel: 'red' | 'green' | 'blue' | 'alpha', value?: number): void {
    if (channel === 'alpha') {
      this.alpha = Math.min(MAX_ALPHA_VALUE, this._rgba.alpha! * toNumber(value));
      return;
    }
    this[channel] = Math.min(MAX_COLOR_VALUE, this[channel] * toNumber(value));
  }

  private divideTheChannel(channel: 'red' | 'green' | 'blue' | 'alpha', value?: number): void {
    this[channel] = Math.max(0, this._rgba[channel]! / toNumber(value || 1));
  }
}
