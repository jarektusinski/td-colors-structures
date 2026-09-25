#### [TusinskiDev] Colors Structures

# td-colors-structures

A lightweight TypeScript color library for working with structured RGB, RGBA, HEXA, and named colors. It provides value objects, string serialization, and utility methods for color manipulation, comparison, and transformation.

## Features

- `RgbaColor` for RGB/RGBA channel-based colors
- `HexaColor` for 8-digit HEXA serialization
- `NamedColor` for named CSS-like colors
- arithmetic helpers such as `add`, `subtract`, `multiply`, `divide`
- image-style transformations such as `grayscale`, `sepia`, `invert`, `lighten`, `darken`, and `contrast`
- comparison utilities like `equals`, `greaterThan`, `lighterThan`, and `darkerThan`

## Installation

```bash
npm install td-colors-structures
```

## Quick start

```ts
import Colors from 'td-colors-structures';

const red = new Colors.RgbaColor(255, 0, 0, 100);
console.log(red.red); // 255
console.log(red.green); // 0
console.log(red.blue); // 0
console.log(red.alpha); // 1
console.log(red.toString()); // rgba(255, 0, 0, 1)

const accent = new Colors.HexaColor({ red: 0, green: 255, blue: 0, alpha: 0.5 });
console.log(accent.toString()); // #00ff0080
console.log(accent.redHex); // 00
console.log(accent.greenHex); // ff
console.log(accent.blueHex); // 00
console.log(accent.alphaHex); // 80

const named = new Colors.NamedColor('Blue');
console.log(named.toString()); // Blue
console.log(named.red); // 0
console.log(named.green); // 0
console.log(named.blue); // 255
```

## Common operations

```ts
import Colors from 'td-colors-structures';

const base = new Colors.RgbaColor(100, 100, 100);

const lighter = base.lighten(10);
console.log(lighter.red); // 115
console.log(lighter.green); // 115
console.log(lighter.blue); // 115

const darker = base.darken(10);
console.log(darker.red); // 90
console.log(darker.green); // 90
console.log(darker.blue); // 90

const transformed = base.grayscale();
console.log(transformed.red); // 0..255 (grayscale intensity)

const sameColor = new Colors.RgbaColor(10, 20, 30);
console.log(sameColor.equals(new Colors.RgbaColor(10, 20, 30))); // true
```

## Available classes

```ts
import Colors from 'td-colors-structures';

const rgba = new Colors.RgbaColor(10, 20, 30, 50);
const hex = new Colors.HexaColor({ red: 255, green: 0, blue: 0, alpha: 1 });
const named = new Colors.NamedColor('Red');
```

## Notes

- RGB channel values are stored in the range `0..255`.
- Alpha is normalized to `0..1` when accessed as a property and internally stored as a percentage-style value.
- Methods such as `add*`, `subtract*`, `multiply*`, `divide*`, `lighten`, and `darken` return a new color object instead of mutating the original instance.

## License

MIT
