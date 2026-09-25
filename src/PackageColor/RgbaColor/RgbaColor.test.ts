import RgbaColor from './RgbaColor';

describe('RgbaColor', () => {
  it.each([
    [new RgbaColor(10, 20, 30, 50), 10, 20, 30, 0.5],
    [new RgbaColor({ red: 10, green: 20, blue: 30, alpha: 0.5 }), 10, 20, 30, 0.5],
  ])('constructs from numeric and object values', (color, red, green, blue, alpha) => {
    expect(color.red).toBe(red);
    expect(color.green).toBe(green);
    expect(color.blue).toBe(blue);
    expect(color.alpha).toBe(alpha);
  });

  it.each([
    [1, 11, 21, 31, 0.51],
    [5, 15, 25, 35, 0.55],
  ])('adds channel values via add and channel helpers', (value, red, green, blue, alpha) => {
    const color = new RgbaColor(10, 20, 30, 50);

    expect(color.add(value).red).toBe(red);
    expect(color.add(value).green).toBe(green);
    expect(color.add(value).blue).toBe(blue);
    expect(color.add(value).alpha).toBe(alpha);

    expect(color.addRed(value).red).toBe(red);
    expect(color.addGreen(value).green).toBe(green);
    expect(color.addBlue(value).blue).toBe(blue);
    expect(color.addAlpha(value).alpha).toBe(0.5 + value / 100);
  });

  it.each([
    [5, 5, 15, 25, 0.45],
    [10, 0, 10, 20, 0.4],
  ])('subtracts and multiplies channel values', (value, red, green, blue, alpha) => {
    const color = new RgbaColor(10, 20, 30, 50);

    const subtracted = color.subtract(value);
    expect(subtracted.red).toBe(red);
    expect(subtracted.green).toBe(green);
    expect(subtracted.blue).toBe(blue);
    expect(subtracted.alpha).toBe(alpha);

    const multiplied = color.multiply(2);
    expect(multiplied.red).toBe(20);
    expect(multiplied.green).toBe(40);
    expect(multiplied.blue).toBe(60);
    expect(multiplied.alpha).toBe(1);

    const divided = color.divide(2);
    expect(divided.red).toBe(5);
    expect(divided.green).toBe(10);
    expect(divided.blue).toBe(15);
    expect(divided.alpha).toBe(0.25);
  });

  it.each([
    [new RgbaColor(255, 0, 0, 100), 'rgba(255, 0, 0, 1)'],
    [new RgbaColor(0, 255, 0, 100), 'rgba(0, 255, 0, 1)'],
    [new RgbaColor(0, 0, 255, 100), 'rgba(0, 0, 255, 1)'],
  ])('serializes to rgba string', (color, expected) => {
    expect(color.toString()).toBe(expected);
  });

  it.each([
    [
      new RgbaColor(200, 100, 50, 100),
      0,
      124,
      { sepiaRed: 164, sepiaGreen: 146, sepiaBlue: 114 },
      155,
    ],
    [
      new RgbaColor(200, 110, 50, 100),
      255,
      130,
      { sepiaRed: 172, sepiaGreen: 153, sepiaBlue: 119 },
      145,
    ],
  ])(
    'performs transformations like threshold, grayscale, sepia and invert',
    (color, thresholdValue, grayscaleValue, { sepiaRed, sepiaGreen, sepiaBlue }, invertedGreen) => {
      const threshold = color.threshold();
      expect(threshold.red).toBe(thresholdValue);
      expect(threshold.green).toBe(thresholdValue);
      expect(threshold.blue).toBe(thresholdValue);
      expect(threshold.alpha).toBe(0.01);

      const grayscale = color.grayscale();
      expect(grayscale.red).toBe(grayscaleValue);
      expect(grayscale.green).toBe(grayscaleValue);
      expect(grayscale.blue).toBe(grayscaleValue);
      expect(grayscale.alpha).toBe(0.01);

      const sepia = color.sepia();
      expect(sepia.red).toBe(sepiaRed);
      expect(sepia.green).toBe(sepiaGreen);
      expect(sepia.blue).toBe(sepiaBlue);
      expect(sepia.alpha).toBe(0.01);

      const inverted = color.invert();
      expect(inverted.red).toBe(55);
      expect(inverted.green).toBe(invertedGreen);
      expect(inverted.blue).toBe(205);
      expect(inverted.alpha).toBe(0.01);
    }
  );

  it('supports extra public transforms and channel-wise operations', () => {
    const color = new RgbaColor(100, 100, 100, 50);
    const cyanotype = color.cyanotype();
    expect(cyanotype.red).toBe(40);
    expect(cyanotype.green).toBe(70);
    expect(cyanotype.blue).toBe(100);

    const solarize = color.solarize();
    expect(solarize.red).toBe(100);
    expect(solarize.green).toBe(100);
    expect(solarize.blue).toBe(100);

    const infrared = color.infrared();
    expect(infrared.red).toBe(100);
    expect(infrared.green).toBe(100);
    expect(infrared.blue).toBe(100);

    const contrasted = color.contrast(50);
    expect(contrasted.red).toBeGreaterThanOrEqual(0);
    expect(contrasted.green).toBeGreaterThanOrEqual(0);
    expect(contrasted.blue).toBeGreaterThanOrEqual(0);

    const saturated = color.saturate(50);
    expect(saturated.red).toBeGreaterThan(0);
    expect(saturated.green).toBeGreaterThan(0);
    expect(saturated.blue).toBeGreaterThan(0);

    const quantized = color.quantize(4);
    expect(quantized.red).toBe(128);
    expect(quantized.green).toBe(128);
    expect(quantized.blue).toBe(128);

    const brighten = color.brighten(10);
    expect(brighten.red).toBe(110);
    expect(brighten.green).toBe(110);
    expect(brighten.blue).toBe(110);

    const darken = color.darken(10);
    expect(darken.red).toBe(90);
    expect(darken.green).toBe(90);
    expect(darken.blue).toBe(90);

    const lighten = color.lighten(10);
    expect(lighten.red).toBe(115);
    expect(lighten.green).toBe(115);
    expect(lighten.blue).toBe(115);

    const dim = color.dim(10);
    expect(dim.red).toBe(90);
    expect(dim.green).toBe(90);
    expect(dim.blue).toBe(90);

    const duotoned = color.duotone(new RgbaColor(255, 0, 0, 100));
    expect(duotoned.red).toBeGreaterThanOrEqual(0);
    expect(duotoned.green).toBeGreaterThanOrEqual(0);
    expect(duotoned.blue).toBeGreaterThanOrEqual(0);
  });

  it('supports increment and decrement', () => {
    const color = new RgbaColor(10, 20, 30, 50);
    color.increment(5);
    expect(color.red).toBe(15);
    expect(color.green).toBe(25);
    expect(color.blue).toBe(35);

    color.decrement(3);
    expect(color.red).toBe(12);
    expect(color.green).toBe(22);
    expect(color.blue).toBe(32);
  });
});
