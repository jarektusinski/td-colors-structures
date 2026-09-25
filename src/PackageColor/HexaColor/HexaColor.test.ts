import HexaColor from './HexaColor';

describe('HexaColor', () => {
  it.each([
    [{ red: 255, green: 0, blue: 0, alpha: 1 }, '#ff0000ff'],
    [{ red: 0, green: 255, blue: 0, alpha: 0.5 }, '#00ff0080'],
    [{ red: 0, green: 0, blue: 255, alpha: 0.25 }, '#0000ff40'],
  ])('serializes to HEXA string', (rgba, expected) => {
    const color = new HexaColor(rgba);
    expect(color.toString()).toBe(expected);
  });

  it.each([
    [{ red: 255, green: 128, blue: 64, alpha: 1 }, 'ff', '80', '40', 'ff'],
    [{ red: 12, green: 34, blue: 56, alpha: 0.5 }, '0c', '22', '38', '80'],
  ])('exposes channel hex converters', (rgba, red, green, blue, alpha) => {
    const color = new HexaColor(rgba);
    expect(color.redHex).toBe(red);
    expect(color.greenHex).toBe(green);
    expect(color.blueHex).toBe(blue);
    expect(color.alphaHex).toBe(alpha);
  });
});
