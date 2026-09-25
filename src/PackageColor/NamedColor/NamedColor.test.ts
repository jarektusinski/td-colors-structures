import NamedColor from './NamedColor';
import RgbaColor from '../RgbaColor/RgbaColor';

describe('NamedColor', () => {
  it.each([
    ['Red', { red: 255, green: 0, blue: 0, alpha: 1 }],
    ['Blue', { red: 0, green: 0, blue: 255, alpha: 1 }],
    ['Green', { red: 0, green: 128, blue: 0, alpha: 1 }],
  ])('creates a valid named color from a color name', (name, rgba) => {
    const color = new NamedColor(name as any);
    expect(color.toString()).toBe(name);
    expect(color.red).toBe(rgba.red);
    expect(color.green).toBe(rgba.green);
    expect(color.blue).toBe(rgba.blue);
    expect(color.alpha).toBe(rgba.alpha);
  });

  it.each([
    ['Red', 10, 'rgba(255, 0, 0, 100)'],
    ['Blue', 10, 'rgba(10, 0, 255, 100)'],
  ])('delegates arithmetic to RgbaColor', (name, value, expected) => {
    const color = new NamedColor(name as any);
    const transformed = color.addRed(value);

    expect(transformed).toBeInstanceOf(RgbaColor);
    expect(transformed.toString()).toBe(expected);
    expect(color.toString()).toBe(name);
  });

  it('supports public image operations through delegates', () => {
    const color = new NamedColor('Red' as any);

    expect(color.grayscale()).toBeInstanceOf(RgbaColor);
    expect(color.sepia()).toBeInstanceOf(RgbaColor);
    expect(color.invert()).toBeInstanceOf(RgbaColor);
    expect(color.threshold()).toBeInstanceOf(RgbaColor);
    expect(color.solarize()).toBeInstanceOf(RgbaColor);
    expect(color.contrast(20)).toBeInstanceOf(RgbaColor);
    expect(color.quantize(4)).toBeInstanceOf(RgbaColor);
    expect(color.darken(10)).toBeInstanceOf(RgbaColor);
    expect(color.lighten(20)).toBeInstanceOf(RgbaColor);
    expect(color.duotone(new NamedColor('Blue' as any))).toBeInstanceOf(RgbaColor);
  });
});
