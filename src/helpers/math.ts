export const deg2rad = (x: number): number => x * ((Math.PI * 2) / 360);
export const rad2deg = (x: number): number => x * (360 / (Math.PI * 2));
export const deglimit = (x: number): number => ((x % 360) + 360) % 360;
export const lerp = (x: number, y: number, a: number): number =>
  x + (y - x) * a;
export const rgb2hsv = (
  { r, g, b }: { r: number; g: number; b: number },
  svMax = 100
): { h: number; s: number; v: number } => {
  const rgb = [r, g, b].map(v => v / 255);
  const [_r, _g, _b] = rgb;
  const max = Math.max(...rgb);
  const min = Math.min(...rgb);
  const diff = max - min;
  const nan2zero = (x: number): number => (isNaN(x) ? 0 : x);
  return {
    h: nan2zero(
      min === _r
        ? 60 * ((_b - _g) / diff) + 180
        : min === _g
        ? 60 * ((_r - _b) / diff) + 300
        : min === _b
        ? 60 * ((_g - _r) / diff) + 60
        : 0
    ),
    s: (max == 0 ? 0 : diff / max) * svMax,
    v: max * svMax
  };
};
export const hsv2rgb = (
  { h, s, v }: { h: number; s: number; v: number },
  svMax = 100
): { r: number; g: number; b: number } => {
  const max = v;
  const min = max - (s / svMax) * max;
  const diff = max - min;
  const rgb = [
    {
      h: 0,
      a: [max, (h / 60) * diff + min, min]
    },
    {
      h: 60,
      a: [((120 - h) / 60) * diff + min, max, min]
    },
    {
      h: 120,
      a: [min, max, ((h - 120) / 60) * diff + min]
    },
    {
      h: 180,
      a: [min, ((240 - h) / 60) * diff + min, max]
    },
    {
      h: 240,
      a: [((h - 240) / 60) * diff + min, min, max]
    },
    {
      h: 300,
      a: [max, min, ((360 - h) / 60) * diff + min]
    }
  ].filter(x => x.h <= h && h < x.h + 60)[0].a;
  const [r, g, b] = rgb.map(x => (x / svMax) * 255);
  return { r, g, b };
};
export const rgb2hex = ({
  r,
  g,
  b
}: {
  r: number;
  g: number;
  b: number;
}): number => (r << 16) + (g << 8) + b;
