// https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/

function hsvToRgb(h, s, v) {
  let r, g, b;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}

const generateRandomColors = (numColors) => {
  const GOLDEN_RATIO = 0.618033988749895;
  let h = Math.random();
  const colors = [];

  for (let i = 0; i < numColors; i++) {
    h += GOLDEN_RATIO;
    h %= 1;
    colors.push(hsvToRgb(h, 0.5, 0.95));
  }
  return colors;
};

function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export { hsvToRgb, generateRandomColors, rgbToHex }