import colorUtils, { Name, RgbaProp } from 'td-colors-utils';
import AbstractColor from '../AbstractColor';
import RgbaColor from '../RgbaColor/RgbaColor';

const { rgbaPropToName, toRgbaProp } = colorUtils;

export default class NamedColor extends AbstractColor {
  private _rgbaObject = new RgbaColor();

  public constructor(name: Name) {
    super(name);
    this.constructorValidationRule(toRgbaProp(name));
  }

  /**
   * Increments all RGB channels by the provided value and returns the underlying RGBA representation.
   */
  public increment(value?: number): RgbaColor {
    this._rgbaObject.increment(value);
    return this._rgbaObject;
  }

  /**
   * Decrements all RGB channels by the provided value and returns the underlying RGBA representation.
   */
  public decrement(value?: number): RgbaColor {
    this._rgbaObject.decrement(value);
    return this._rgbaObject;
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
  public add(value?: number, green?: number, blue?: number, alpha?: number): RgbaColor {
    return this._rgbaObject.add(value, green, blue, alpha);
  }

  /**
   * Adds a value to the alpha channel and returns the transformed color as RGBA.
   */
  public addAlpha(value?: number): RgbaColor {
    return this._rgbaObject.addAlpha(value);
  }

  /**
   * Adds a value to the blue channel and returns the transformed color as RGBA.
   */
  public addBlue(value?: number): RgbaColor {
    return this._rgbaObject.addBlue(value);
  }

  /**
   * Adds a value to the green channel and returns the transformed color as RGBA.
   */
  public addGreen(value: number = 0): RgbaColor {
    return this._rgbaObject.addGreen(value);
  }

  /**
   * Adds a value to the red channel and returns the transformed color as RGBA.
   */
  public addRed(value: number = 0): RgbaColor {
    return this._rgbaObject.addRed(value);
  }

  /**
   * Adds the channels of another color to the current value and returns the result as RGBA.
   */
  public addColor(color: AbstractColor): RgbaColor {
    return this._rgbaObject.addColor(color);
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
  public subtract(value?: number, green?: number, blue?: number, alpha?: number): RgbaColor {
    return this._rgbaObject.subtract(value, green, blue, alpha);
  }

  /**
   * Subtracts a value from the alpha channel and returns the transformed color as RGBA.
   */
  public subtractAlpha(value?: number): RgbaColor {
    return this._rgbaObject.subtractAlpha(value);
  }

  /**
   * Subtracts a value from the blue channel and returns the transformed color as RGBA.
   */
  public subtractBlue(value?: number): RgbaColor {
    return this._rgbaObject.subtractBlue(value);
  }

  /**
   * Subtracts a value from the green channel and returns the transformed color as RGBA.
   */
  public subtractGreen(value?: number): RgbaColor {
    return this._rgbaObject.subtractGreen(value);
  }

  /**
   * Subtracts a value from the red channel and returns the transformed color as RGBA.
   */
  public subtractRed(value?: number): RgbaColor {
    return this._rgbaObject.subtractRed(value);
  }

  /**
   * Subtracts the channels of another color from the current value and returns the result as RGBA.
   */
  public subtractColor(color: this): RgbaColor {
    return this._rgbaObject.subtractColor(color);
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
  public multiply(value?: number, green?: number, blue?: number, alpha?: number): RgbaColor {
    return this._rgbaObject.multiply(value, green, blue, alpha);
  }

  /**
   * Multiplies the alpha channel and returns the transformed color as RGBA.
   */
  public multiplyAlpha(value?: number): RgbaColor {
    return this._rgbaObject.multiplyAlpha(value);
  }

  /**
   * Multiplies the blue channel and returns the transformed color as RGBA.
   */
  public multiplyBlue(value?: number): RgbaColor {
    return this._rgbaObject.multiplyBlue(value);
  }

  /**
   * Multiplies the green channel and returns the transformed color as RGBA.
   */
  public multiplyGreen(value?: number): RgbaColor {
    return this._rgbaObject.multiplyGreen(value);
  }

  /**
   * Multiplies the red channel and returns the transformed color as RGBA.
   */
  public multiplyRed(value?: number): RgbaColor {
    return this._rgbaObject.multiplyRed(value);
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
  public divide(value?: number, green?: number, blue?: number, alpha?: number): RgbaColor {
    return this._rgbaObject.divide(value, green, blue, alpha);
  }

  /**
   * Divides the alpha channel and returns the transformed color as RGBA.
   */
  public divideAlpha(value?: number): RgbaColor {
    return this._rgbaObject.divideAlpha(value);
  }

  /**
   * Divides the blue channel and returns the transformed color as RGBA.
   */
  public divideBlue(value?: number): RgbaColor {
    return this._rgbaObject.divideBlue(value);
  }

  /**
   * Divides the green channel and returns the transformed color as RGBA.
   */
  public divideGreen(value?: number): RgbaColor {
    return this._rgbaObject.divideGreen(value);
  }

  /**
   * Divides the red channel and returns the transformed color as RGBA.
   */
  public divideRed(value?: number): RgbaColor {
    return this._rgbaObject.divideRed(value);
  }

  /**
   * Returns the average color between this named color and another color.
   */
  public average(color: AbstractColor): RgbaColor {
    return this._rgbaObject.average(color);
  }

  /**
   * Converts the color to a black-and-white threshold output.
   */
  public threshold(): RgbaColor {
    return this._rgbaObject.threshold();
  }

  /**
   * Converts the color to grayscale.
   */
  public grayscale(): RgbaColor {
    return this._rgbaObject.grayscale();
  }

  /**
   * Applies a sepia tone.
   */
  public sepia(): RgbaColor {
    return this._rgbaObject.sepia();
  }

  /**
   * Produces a cyanotype-style tint.
   */
  public cyanotype(): RgbaColor {
    return this._rgbaObject.cyanotype();
  }

  /**
   * Inverts the RGB channels.
   */
  public invert(): RgbaColor {
    return this._rgbaObject.invert();
  }

  /**
   * Solarizes the color by thresholding high-channel values.
   */
  public solarize(): RgbaColor {
    return this._rgbaObject.solarize();
  }

  /**
   * Produces an infrared-like channel swap.
   */
  public infrared(): RgbaColor {
    return this._rgbaObject.infrared();
  }

  /**
   * Adjusts contrast by a numeric value.
   */
  public contrast(value: number): RgbaColor {
    return this._rgbaObject.contrast(value);
  }

  /**
   * Saturates the current color by a percentage.
   */
  public saturate(value: number): RgbaColor {
    return this._rgbaObject.saturate(value);
  }

  /**
   * Quantizes color channels to the given number of levels.
   */
  public quantize(levels: number): RgbaColor {
    return this._rgbaObject.quantize(levels);
  }

  /**
   * Brightens the color by the given value.
   */
  public brighten(value: number): RgbaColor {
    return this._rgbaObject.brighten(value);
  }

  /**
   * Darkens the color by the given value.
   */
  public darken(value: number): RgbaColor {
    return this._rgbaObject.darken(value);
  }

  /**
   * Lightens the color toward white by a percentage.
   */
  public lighten(percent: number): RgbaColor {
    return this._rgbaObject.lighten(percent);
  }

  /**
   * Dims the color toward black by a percentage.
   */
  public dim(percent: number): RgbaColor {
    return this._rgbaObject.dim(percent);
  }

  /**
   * Blends this color toward another color using a duotone effect.
   */
  public duotone(color: AbstractColor): RgbaColor {
    return this._rgbaObject.duotone(color);
  }

  /**
   * Returns the canonical named-color string.
   */
  public toString(): string {
    return rgbaPropToName(this._rgba)!;
  }

  private constructorValidationRule(rgba: RgbaProp): void {
    if (!rgbaPropToName(rgba)) {
      throw new Error(
        `Unable to create a NamedColor instance. The provided color values do not correspond to any named color. RGBA: (${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`
      );
    }

    this._rgbaObject = new RgbaColor(
      this._rgba.red,
      this._rgba.green,
      this._rgba.blue,
      this._rgba.alpha
    );
  }
}
